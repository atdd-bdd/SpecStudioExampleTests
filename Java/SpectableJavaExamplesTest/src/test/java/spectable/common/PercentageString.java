package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Percentage as a table cell holds it: the unconverted text. */
public class PercentageString {
    public final String value;

    public PercentageString(String value) {
        this.value = value != null ? value : "";
    }

    public static PercentageString fromText(String text) {
        return new PercentageString(text);
    }

    @Override
    public String toString() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PercentageString)) return false;
        return value.equals(((PercentageString) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }
}
