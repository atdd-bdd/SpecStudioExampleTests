package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Score as a table cell holds it: the unconverted text. */
public class ScoreString {
    public final String value;

    public ScoreString(String value) {
        this.value = value != null ? value : "";
    }

    public static ScoreString fromText(String text) {
        return new ScoreString(text);
    }

    @Override
    public String toString() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ScoreString)) return false;
        return value.equals(((ScoreString) o).value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }
}
