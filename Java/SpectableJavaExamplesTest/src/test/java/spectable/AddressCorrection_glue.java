package spectable;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import spectable.common.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Glue for a specification that tests a live service.
 *
 * There are no production classes here: the Census Bureau geocoder is the thing
 * under test. So this file does only what glue should -- it builds the call,
 * hands it to RestCall, translates the answer into the shape the tables use,
 * and compares. No rule about addresses is decided in this file; every expected
 * value comes from the specification.
 *
 * The one piece of real work is flattening. The service answers with
 *
 *     {"result": {"addressMatches": [ {"matchedAddress": "...",
 *                                      "addressComponents": { ... }} ]}}
 *
 * and a table is flat, so each match is lifted out and its components spread
 * into one MatchString. That is translation, not computation.
 */
public class AddressCorrection_glue {

    private String baseUrl;
    private RestCall response;

    public void Given_base_Page_is(List<List<String>> values) {
        baseUrl = values.get(0).get(0);
    }

    public void When_sending_request(List<RequestString> values) {
        RequestString request = values.get(0);
        response = RestCall.send(request.method, baseUrl, request.page,
                                 query(request), "");
    }

    public void Then_response_status_is(List<StatusString> values) {
        StatusTyped expected = new StatusTyped(values.get(0));
        assertEquals(expected.code, response.getStatus(),
                     "HTTP status from " + response.getUrl());
    }

    public void Then_match_count_is(List<ResultString> values) {
        ResultTyped expected = new ResultTyped(values.get(0));
        assertEquals(expected.matchCount, matches().size(),
                     "number of addresses matched");
    }

    public void Then_the_matched_address_is(List<MatchString> values) {
        List<MatchString> actual = matches();
        assertEquals(1, actual.size(), "expected exactly one match");
        // MatchString.equals treats ?DNC? on either side as "do not compare",
        // which is what makes a CompareOnly table check only its own columns.
        assertEquals(values.get(0), actual.get(0), "corrected address");
    }

    public void Then_the_matched_addresses_are(List<MatchString> values) {
        List<MatchString> actual = new ArrayList<>(matches());
        assertEquals(values.size(), actual.size(), "number of candidates");

        // Compared as a set rather than in order: each expected row must find an
        // actual row it has not already claimed. A test that fails because a
        // service reordered its results is testing the wrong thing.
        for (MatchString expected : values) {
            boolean found = actual.removeIf(candidate -> candidate.equals(expected));
            assertTrue(found, "no returned address matched " + expected
                              + "\n  remaining: " + actual);
        }
    }

    // ---- translation -------------------------------------------------------

    /** The query string the geocoder expects, from the fields of the table. */
    private static String query(RequestString request) {
        return "?address=" + encode(request.address)
             + "&benchmark=" + encode(request.benchmark)
             + "&format=" + encode(request.format);
    }

    private static String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    /** result.addressMatches, each flattened into the shape of the Match table. */
    private List<MatchString> matches() {
        Map<String, Object> body = Json.parseObject(response.getBody());
        Map<String, Object> result = Json.getObject(body, "result");

        List<MatchString> flattened = new ArrayList<>();
        for (Object each : Json.getArray(result, "addressMatches")) {
            Map<String, Object> match = Json.asObject(each, "addressMatch");
            Map<String, Object> parts = Json.getObject(match, "addressComponents");
            flattened.add(new MatchString(
                    Json.getString(match, "matchedAddress"),
                    Json.getString(parts, "preDirection"),
                    Json.getString(parts, "streetName"),
                    Json.getString(parts, "suffixType"),
                    Json.getString(parts, "suffixDirection"),
                    Json.getString(parts, "city"),
                    Json.getString(parts, "state"),
                    Json.getString(parts, "zip")));
        }
        return flattened;
    }
}
