package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** SimpleText as a table cell holds it: the unconverted text. */
public class SimpleTextString {
    public final String value;

    public SimpleTextString(String value) {
        this.value = value != null ? value : "";
    }

    public static SimpleTextString fromText(String text) {
        return new SimpleTextString(text);
    }

    @Override
    public String toString() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SimpleTextString)) return false;
        return value.equals(((SimpleTextString) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }
}
