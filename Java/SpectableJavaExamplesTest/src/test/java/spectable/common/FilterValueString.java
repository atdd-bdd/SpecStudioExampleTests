package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FilterValueString {
    private static final String DNCString = "?DNC?";

    public IDFormString value;

    public FilterValueString(String value) {
        this.value = new IDFormString(value);
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static FilterValueString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "FilterValue");
        return new FilterValueString(parts.get(0));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FilterValueString)) return false;
        FilterValueString that = (FilterValueString) o;
        return (DNCString.equals(value.value) || DNCString.equals(that.value.value) || Objects.equals(value.value, that.value.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    @Override
    public String toString() {
        return Tokens.token(value.value);
    }
}
