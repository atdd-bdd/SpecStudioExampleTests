package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResultValueString {
    private static final String DNCString = "?DNC?";

    public String sum;

    public ResultValueString(String sum) {
        this.sum = sum;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ResultValueString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "ResultValue");
        return new ResultValueString(parts.get(0));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultValueString)) return false;
        ResultValueString that = (ResultValueString) o;
        return (DNCString.equals(sum) || DNCString.equals(that.sum) || Objects.equals(sum, that.sum));
    }

    @Override
    public int hashCode() {
        return Objects.hash(sum);
    }

    @Override
    public String toString() {
        return Tokens.token(sum);
    }
}
