package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class StatusString {
    private static final String DNCString = "?DNC?";

    public String code;

    public StatusString(String code) {
        this.code = code;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static StatusString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "Status");
        return new StatusString(parts.get(0));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StatusString)) return false;
        StatusString that = (StatusString) o;
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
