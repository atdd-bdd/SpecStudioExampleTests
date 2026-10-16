package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Pins as the glue uses it: the text read into the declared type. */
public class PinsTyped {
    private static final String DNCString = "?DNC?";

    /** The cell as written. ?DNC? and an empty cell are kept as they came. */
    public final String text;
    private final Pins value;   // null for an empty cell or ?DNC?

    public PinsTyped(PinsString s) {
        this.text  = s == null ? "" : s.value;
        this.value = (text.isEmpty() || DNCString.equals(text)) ? null
                   : new Pins(text);
    }

    public PinsTyped(Pins value) {
        this.value = value;
        this.text  = value == null ? "" : value.toString();
    }

    public boolean hasValue() { return value != null; }

    /** The declared value, or null for an empty cell or ?DNC?. */
    public Pins get() { return value; }

    public PinsString toPinsString() { return new PinsString(text); }

    public static List<PinsTyped> fromStringList(List<PinsString> list) {
        List<PinsTyped> result = new ArrayList<PinsTyped>();
        if (list != null) for (PinsString s : list) result.add(new PinsTyped(s));
        return result;
    }

    public static List<PinsString> toStringList(List<PinsTyped> list) {
        List<PinsString> result = new ArrayList<PinsString>();
        if (list != null) for (PinsTyped t : list) result.add(t.toPinsString());
        return result;
    }

    @Override
    public String toString() { return text; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PinsTyped)) return false;
        PinsTyped that = (PinsTyped) o;
        return DNCString.equals(text) || DNCString.equals(that.text)
            || Objects.equals(text, that.text);
    }

    @Override
    public int hashCode() { return Objects.hash(text); }
}
