package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResponseString {
    private static final String DNCString = "?DNC?";

    public ResultString result;

    public ResponseString(ResultString result) {
        this.result = result;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ResponseString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "Response");
        return new ResponseString(ResultString.fromText(parts.get(0)));
    }

    public ResponseString(String text) {
        ResponseString parsed = fromText(text);
        this.result = parsed.result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResponseString)) return false;
        ResponseString that = (ResponseString) o;
        return Objects.equals(result, that.result);
    }

    @Override
    public int hashCode() {
        return Objects.hash(result);
    }

    @Override
    public String toString() {
        return Tokens.nested(String.valueOf(result));
    }
}
