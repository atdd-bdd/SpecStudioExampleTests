package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ApiRequestString {
    private static final String DNCString = "?DNC?";

    public String method;
    public String page;
    public String parameter;
    public String body;

    public ApiRequestString(String method, String page, String parameter, String body) {
        this.method = method;
        this.page = page;
        this.parameter = parameter;
        this.body = body;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ApiRequestString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 4, "ApiRequest");
        return new ApiRequestString(parts.get(0), parts.get(1), parts.get(2), parts.get(3));
    }

    public ApiRequestString(String text) {
        ApiRequestString parsed = fromText(text);
        this.method = parsed.method;
        this.page = parsed.page;
        this.parameter = parsed.parameter;
        this.body = parsed.body;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApiRequestString)) return false;
        ApiRequestString that = (ApiRequestString) o;
        return (DNCString.equals(method) || DNCString.equals(that.method) || Objects.equals(method, that.method))
            && (DNCString.equals(page) || DNCString.equals(that.page) || Objects.equals(page, that.page))
            && (DNCString.equals(parameter) || DNCString.equals(that.parameter) || Objects.equals(parameter, that.parameter))
            && (DNCString.equals(body) || DNCString.equals(that.body) || Objects.equals(body, that.body));
    }

    @Override
    public int hashCode() {
        return Objects.hash(method, page, parameter, body);
    }

    @Override
    public String toString() {
        return Tokens.token(method) + " " + Tokens.token(page) + " " + Tokens.token(parameter) + " " + Tokens.token(body);
    }
}
