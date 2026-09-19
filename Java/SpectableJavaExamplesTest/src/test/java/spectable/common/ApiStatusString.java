package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ApiStatusString {
    private static final String DNCString = "?DNC?";

    public String code;

    public ApiStatusString(String code) {
        this.code = code;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ApiStatusString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "ApiStatus");
        return new ApiStatusString(parts.get(0));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApiStatusString)) return false;
        ApiStatusString that = (ApiStatusString) o;
        return (DNCString.equals(code) || DNCString.equals(that.code) || Objects.equals(code, that.code));
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }

    @Override
    public String toString() {
        return Tokens.token(code);
    }
}
