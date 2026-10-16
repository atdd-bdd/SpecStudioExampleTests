package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class IDValueString {
    private static final String DNCString = "?DNC?";

    public IDFormString iD;
    public String value;

    public IDValueString(String iD, String value) {
        this.iD = new IDFormString(iD);
        this.value = value;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static IDValueString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 2, "IDValue");
        return new IDValueString(parts.get(0), parts.get(1));
    }

    public IDValueString(String text) {
        IDValueString parsed = fromText(text);
        this.iD = parsed.iD;
        this.value = parsed.value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IDValueString)) return false;
        IDValueString that = (IDValueString) o;
        return (DNCString.equals(iD.value) || DNCString.equals(that.iD.value) || Objects.equals(iD.value, that.iD.value))
            && (DNCString.equals(value) || DNCString.equals(that.value) || Objects.equals(value, that.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(iD, value);
    }

    @Override
    public String toString() {
        return Tokens.token(iD.value) + " " + Tokens.token(value);
    }
}
