package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Percentage as the glue uses it: the text read into the declared type. */
public class PercentageTyped {
    private static final String DNCString = "?DNC?";

    /** The cell as written. ?DNC? and an empty cell are kept as they came. */
    public final String text;
    private final Percentage value;   // null for an empty cell or ?DNC?

    public PercentageTyped(PercentageString s) {
        this.text  = s == null ? "" : s.value;
        this.value = (text.isEmpty() || DNCString.equals(text)) ? null
                   : new Percentage(text);
    }

    public PercentageTyped(Percentage value) {
        this.value = value;
        this.text  = value == null ? "" : value.toString();
    }

    public boolean hasValue() { return value != null; }

    /** The declared value, or null for an empty cell or ?DNC?. */
    public Percentage get() { return value; }

    public PercentageString toPercentageString() { return new PercentageString(text); }

    public static List<PercentageTyped> fromStringList(List<PercentageString> list) {
        List<PercentageTyped> result = new ArrayList<PercentageTyped>();
        if (list != null) for (PercentageString s : list) result.add(new PercentageTyped(s));
        return result;
    }

    public static List<PercentageString> toStringList(List<PercentageTyped> list) {
        List<PercentageString> result = new ArrayList<PercentageString>();
        if (list != null) for (PercentageTyped t : list) result.add(t.toPercentageString());
        return result;
    }

    @Override
    public String toString() { return text; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PercentageTyped)) return false;
        PercentageTyped that = (PercentageTyped) o;
        return DNCString.equals(text) || DNCString.equals(that.text)
            || Objects.equals(text, that.text);
    }

    @Override
    public int hashCode() { return Objects.hash(text); }
}
