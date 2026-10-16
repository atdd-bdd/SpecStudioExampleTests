package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** IDForm as a table cell holds it: the unconverted text. */
public class IDFormString {
    public final String value;

    public IDFormString(String value) {
        this.value = value != null ? value : "";
    }

    public static IDFormString fromText(String text) {
        return new IDFormString(text);
    }

    @Override
    public String toString() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IDFormString)) return false;
        return value.equals(((IDFormString) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }
}
