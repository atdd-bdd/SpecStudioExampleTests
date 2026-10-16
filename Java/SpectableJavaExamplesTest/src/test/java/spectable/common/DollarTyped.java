package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Dollar as the glue uses it: the text read into the declared type. */
public class DollarTyped {
    private static final String DNCString = "?DNC?";

    /** The cell as written. ?DNC? and an empty cell are kept as they came. */
    public final String text;
    private final Dollar value;   // null for an empty cell or ?DNC?

    public DollarTyped(DollarString s) {
        this.text  = s == null ? "" : s.value;
        this.value = (text.isEmpty() || DNCString.equals(text)) ? null
                   : new Dollar(text);
    }

    public DollarTyped(Dollar value) {
        this.value = value;
        this.text  = value == null ? "" : value.toString();
    }

    public boolean hasValue() { return value != null; }

    /** The declared value, or null for an empty cell or ?DNC?. */
    public Dollar get() { return value; }

    public DollarString toDollarString() { return new DollarString(text); }

    public static List<DollarTyped> fromStringList(List<DollarString> list) {
        List<DollarTyped> result = new ArrayList<DollarTyped>();
        if (list != null) for (DollarString s : list) result.add(new DollarTyped(s));
        return result;
    }

    public static List<DollarString> toStringList(List<DollarTyped> list) {
        List<DollarString> result = new ArrayList<DollarString>();
        if (list != null) for (DollarTyped t : list) result.add(t.toDollarString());
        return result;
    }

    @Override
    public String toString() { return text; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DollarTyped)) return false;
        DollarTyped that = (DollarTyped) o;
        return DNCString.equals(text) || DNCString.equals(that.text)
            || Objects.equals(text, that.text);
    }

    @Override
    public int hashCode() { return Objects.hash(text); }
}
