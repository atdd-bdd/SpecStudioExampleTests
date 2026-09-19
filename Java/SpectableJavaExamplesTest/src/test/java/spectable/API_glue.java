package spectable;

import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import spectable.common.*;
import production.*;
import java.util.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

/**
 * Exercises a live REST API over HTTP.
 *
 * There are no production classes behind this one: the API itself is the thing
 * under test. RestCall does the transport, so what is left here is only the
 * three things glue should do — turn a table into JSON with the generated
 * toJSON(), turn the reply back into objects with the generated fromJSON(), and
 * compare whole objects with equals().
 *
 * The status and the body are separate steps because they come from separate
 * places. Keeping them apart is what lets the body go straight through the
 * generated reader: while a status was mixed into the body's attribute set, the
 * reader demanded a "status" field no API response ever contains.
 *
 * Two rules this file follows, and did not always:
 *
 * It never touches JSON. Every reply goes through PostTyped.fromJSON or
 * fromJSONList. Glue that navigates a reply is a sign the specification is not
 * describing that reply honestly, and glue that parses one is doing work the
 * generator already did.
 *
 * It compares objects, not fields. A full table becomes a PostTyped and is
 * compared to the reply's PostTyped, so the comparison covers the conversion as
 * well as the text. A CompareOnly table leaves its unstated columns holding
 * ?DNC?, which only the String class skips, so that case compares PostString to
 * PostString instead. Nothing here inspects a field by name.
 */
public class API_glue {
    private static final String DNCString = "?DNC?";

    private String basePage = "";

    /** Bodies offered by Given steps, keyed by the attribute set that carried them. */
    private final Map<String, String> bodies = new LinkedHashMap<>();

    private RestCall call;

    // ---- given --------------------------------------------------------------

    public void Given_base_Page_is(List<List<String>> values) {
        for (List<String> row : values)
            for (String cell : row)
                if (!cell.trim().isEmpty())
                    basePage = cell.trim();
        assertTrue(!basePage.isEmpty(), "no base Page given");
    }

    public void Given_new_post_data(List<NewPostString> values) {
        for (NewPostString value : values)
            bodies.put("NewPost", new NewPostTyped(value).toJSON());
    }

    public void Given_replacement_data(List<ReplacePostString> values) {
        for (ReplacePostString value : values)
            bodies.put("ReplacePost", new ReplacePostTyped(value).toJSON());
    }

    public void Given_patch_data(List<PatchTitleString> values) {
        for (PatchTitleString value : values)
            bodies.put("PatchTitle", new PatchTitleTyped(value).toJSON());
    }

    // ---- when ---------------------------------------------------------------

    public void When_sending_request(List<ApiRequestString> values) {
        for (ApiRequestString value : values) {
            ApiRequestTyped request = new ApiRequestTyped(value);

            // Body names an attribute set a Given step already turned into JSON.
            String bodyName = request.body == null ? "" : request.body.trim();
            String payload = "";
            if (!bodyName.isEmpty()) {
                payload = bodies.get(bodyName);
                assertNotNull(payload, "no Given step supplied a body named " + bodyName);
            }

            try {
                call = RestCall.send(request.method, basePage,
                                     request.page, request.parameter, payload);
            } catch (IllegalStateException e) {
                fail(e.getMessage());
            }
        }
    }

    // ---- then ---------------------------------------------------------------

    public void Then_response_status_is(List<ApiStatusString> values) {
        assertNotNull(call, "no request was sent");
        for (ApiStatusString expected : values)
            assertEquals(new ApiStatusTyped(expected).code, call.getStatus(),
                         "HTTP status from " + call.getUrl());
    }

    public void Then_response_body_is(List<PostString> values) {
        assertNotNull(call, "no request was sent");
        PostTyped actual = PostTyped.fromJSON(call.getBody());

        for (PostString expected : values)
            comparePost("", expected, actual);
    }

    public void Then_response_array_contains_this_many_items(List<List<String>> values) {
        assertNotNull(call, "no request was sent");
        final int expected = TableHelper.toListListInteger(values).get(0).get(0);
        assertEquals(expected, PostTyped.fromJSONList(call.getBody()).size(),
                     "number of items returned by " + call.getUrl());
    }

    // ---- the one comparison -------------------------------------------------

    /**
     * One expected row against one returned post.
     *
     * A table that states every column is compared typed, so that the values are
     * checked as the types the specification declares and not merely as matching
     * text. A CompareOnly table cannot be: its unstated columns hold ?DNC?, which
     * has no typed meaning, and only the String class knows to skip it. So that
     * case compares the string form of both sides instead.
     */
    private static void comparePost(String where, PostString expected, PostTyped actual) {
        if (statesEveryColumn(expected)) {
            assertEquals(new PostTyped(expected), actual, where + "post");
        } else {
            assertEquals(expected, actual.toPostString(), where + "post");
        }
    }

    /** False when any column was left to CompareOnly, and so holds ?DNC?. */
    private static boolean statesEveryColumn(PostString row) {
        return !DNCString.equals(row.userId)
            && !DNCString.equals(row.id)
            && !DNCString.equals(row.title)
            && !DNCString.equals(row.body);
    }
}
