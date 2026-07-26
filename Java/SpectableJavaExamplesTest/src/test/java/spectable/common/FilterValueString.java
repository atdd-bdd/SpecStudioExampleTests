package spectable.common;

import java.util.Objects;
import production.*;

public class FilterValueString {
    private static final String DNCString = "?DNC?";

    public String value;

    public FilterValueString(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FilterValueString)) return false;
        FilterValueString that = (FilterValueString) o;
        return (DNCString.equals(value) || DNCString.equals(that.value) || Objects.equals(value, that.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    @Override
    public String toString() {
        return "Value=" + value;
    }
}
