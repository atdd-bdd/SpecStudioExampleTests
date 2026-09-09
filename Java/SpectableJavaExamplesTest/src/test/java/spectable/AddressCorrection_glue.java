package spectable;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import spectable.common.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Glue for a specification that tests a live service.
 *
 * There are no production classes: the Census Bureau geocoder is the thing under
 * test. So this file does only three things -- build the call, hand the reply to
 * the generated fromJSON, and compare. It never touches the JSON itself.
 *
 * That is possible because the attribute sets in the specification mirror the
 * shape of the reply, so ResponseTyped.fromJSON reads all of it. An earlier
 * version flattened result.addressMatches[].addressComponents by hand, with a
 * dozen Json.getString calls, because the specification had declared one flat
 * block instead. Glue navigating a reply is a sign the specification is not
 * describing it honestly.
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

    public void Then_the_matched_addresses_are(List<MatchString> values) {
        List<MatchString> actual = new ArrayList<>(matches());
        assertEquals(values.size(), actual.size(),
                     "number of matches\n  expected: " + values
                     + "\n  actual:   " + actual);

        // Compared as a set rather than in order: each expected row must find an
        // actual row it has not already claimed. A test that fails because a
        // service reordered its results is testing the wrong thing.
        //
        // The comparison is on the String form, not the Typed one. Only the
        // String classes skip a field marked ?DNC?, which is what makes a
        // CompareOnly table check its own columns and no others.
        for (MatchString expected : values) {
            boolean found = actual.removeIf(candidate -> candidate.equals(expected));
            assertTrue(found, "no returned address matched " + expected
                              + "\n  remaining: " + actual);
        }
    }

    public void Then_there_are_no_matched_addresses() {
        assertEquals(0, matches().size(),
                     "expected no match for an address that does not exist");
    }

    // ---- the two translations -------------------------------------------

    /** The query string the geocoder expects, from the fields of the table. */
    private static String query(RequestString request) {
        return "?address=" + encode(request.address)
             + "&benchmark=" + encode(request.benchmark)
             + "&format=" + encode(request.format);
    }

    private static String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    /** The reply, read by the generated reader, as the rows a table compares. */
    private List<MatchString> matches() {
        ResponseTyped reply = ResponseTyped.fromJSON(response.getBody());
        return MatchTyped.toStringList(reply.result.addressMatches);
    }
}
