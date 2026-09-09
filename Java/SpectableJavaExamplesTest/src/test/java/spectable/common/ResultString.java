package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResultString {
    private static final String DNCString = "?DNC?";

    public String addressMatches;

    public ResultString(String addressMatches) {
        this.addressMatches = addressMatches;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ResultString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "Result");
        return new ResultString(parts.get(0));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultString)) return false;
        ResultString that = (ResultString) o;
        return (DNCString.equals(addressMatches) || DNCString.equals(that.addressMatches) || Objects.equals(addressMatches, that.addressMatches));
    }

    @Override
    public int hashCode() {
        return Objects.hash(addressMatches);
    }

    @Override
    public String toString() {
        return Tokens.token(addressMatches);
    }
}
