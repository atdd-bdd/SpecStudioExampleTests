package spectable;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * The transport for a specification that tests a live service.
 *
 * It lives beside the glue rather than in common/, which every build rewrites.
 * It knows nothing about addresses: give it the pieces of a call and it returns
 * the status and the body. Deciding what the answer should be is the
 * specification's job, and comparing is the glue's.
 *
 * A call that cannot be made at all throws, naming the URL. That is a broken
 * test rather than a failed assertion, and the two should not look alike in the
 * output.
 */
public final class RestCall {

    private static final HttpClient CLIENT = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(20))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    private final int status;
    private final String body;
    private final String url;

    private RestCall(int status, String body, String url) {
        this.status = status;
        this.body = body;
        this.url = url;
    }

    public int getStatus()  { return status; }
    public String getBody() { return body; }
    public String getUrl()  { return url; }

    /**
     * @param parameter appended after the page. A parameter beginning with '?'
     *                  is a query string and is appended as it stands; anything
     *                  else is a path segment and is joined with a slash. So
     *                  posts/1 is page "posts" with parameter "1", and a search
     *                  is page "search" with parameter "?q=hat".
     * @param request   the request body, or null/empty for a call without one.
     */
    public static RestCall send(String method, String baseUrl, String page,
                                String parameter, String request) {
        final String url = buildUrl(baseUrl, page, parameter);

        HttpRequest.BodyPublisher payload = (request == null || request.isEmpty())
                ? HttpRequest.BodyPublishers.noBody()
                : HttpRequest.BodyPublishers.ofString(request);

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(30))
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .method(method.toUpperCase(), payload)
                .build();

        try {
            HttpResponse<String> response =
                    CLIENT.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            return new RestCall(response.statusCode(), response.body(), url);
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) Thread.currentThread().interrupt();
            throw new IllegalStateException(
                    "Could not call " + url + " -- " + e.getMessage(), e);
        }
    }

    /** Joins the pieces with exactly one slash, dropping any that are empty. */
    static String buildUrl(String baseUrl, String page, String parameter) {
        StringBuilder url = new StringBuilder(trimSlashes(baseUrl));

        String cleanPage = trimSlashes(page);
        if (!cleanPage.isEmpty()) url.append('/').append(cleanPage);

        if (parameter != null && !parameter.isEmpty()) {
            if (parameter.startsWith("?")) {
                url.append(parameter);
            } else {
                url.append('/').append(trimSlashes(parameter));
            }
        }
        return url.toString();
    }

    private static String trimSlashes(String s) {
        if (s == null) return "";
        int from = 0, to = s.length();
        while (from < to && s.charAt(from) == '/') from++;
        while (to > from && s.charAt(to - 1) == '/') to--;
        return s.substring(from, to);
    }
}
