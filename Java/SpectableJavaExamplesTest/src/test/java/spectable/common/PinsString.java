package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Pins as a table cell holds it: the unconverted text. */
public class PinsString {
    public final String value;

    public PinsString(String value) {
        this.value = value != null ? value : "";
    }

    public static PinsString fromText(String text) {
        return new PinsString(text);
    }

    @Override
    public String toString() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PinsString)) return false;
        return value.equals(((PinsString) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }
}
