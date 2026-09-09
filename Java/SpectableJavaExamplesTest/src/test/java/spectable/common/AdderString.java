package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class AdderString {
    private static final String DNCString = "?DNC?";

    public String number1;
    public String number2;
    public String result;

    public AdderString(String number1, String number2, String result) {
        this.number1 = number1;
        this.number2 = number2;
        this.result = result;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static AdderString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 3, "Adder");
        return new AdderString(parts.get(0), parts.get(1), parts.get(2));
    }

    public AdderString(String text) {
        AdderString parsed = fromText(text);
        this.number1 = parsed.number1;
        this.number2 = parsed.number2;
        this.result = parsed.result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AdderString)) return false;
        AdderString that = (AdderString) o;
        return (DNCString.equals(number1) || DNCString.equals(that.number1) || Objects.equals(number1, that.number1))
            && (DNCString.equals(number2) || DNCString.equals(that.number2) || Objects.equals(number2, that.number2))
            && (DNCString.equals(result) || DNCString.equals(that.result) || Objects.equals(result, that.result));
    }

    @Override
    public int hashCode() {
        return Objects.hash(number1, number2, result);
    }

    @Override
    public String toString() {
        return Tokens.token(number1) + " " + Tokens.token(number2) + " " + Tokens.token(result);
    }
}
