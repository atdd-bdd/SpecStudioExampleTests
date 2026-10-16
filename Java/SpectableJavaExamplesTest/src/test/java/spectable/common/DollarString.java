package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Dollar as a table cell holds it: the unconverted text. */
public class DollarString {
    public final String value;

    public DollarString(String value) {
        this.value = value != null ? value : "";
    }

    public static DollarString fromText(String text) {
        return new DollarString(text);
    }

    @Override
    public String toString() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DollarString)) return false;
        return value.equals(((DollarString) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }
}
