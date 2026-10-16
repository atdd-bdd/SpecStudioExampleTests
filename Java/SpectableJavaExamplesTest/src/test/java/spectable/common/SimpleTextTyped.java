package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** SimpleText as the glue uses it: the text read into the declared type. */
public class SimpleTextTyped {
    private static final String DNCString = "?DNC?";

    /** The cell as written. ?DNC? and an empty cell are kept as they came. */
    public final String text;
    private final SimpleText value;   // null for an empty cell or ?DNC?

    public SimpleTextTyped(SimpleTextString s) {
        this.text  = s == null ? "" : s.value;
        this.value = (text.isEmpty() || DNCString.equals(text)) ? null
                   : new SimpleText(text);
    }

    public SimpleTextTyped(SimpleText value) {
        this.value = value;
        this.text  = value == null ? "" : value.toString();
    }

    public boolean hasValue() { return value != null; }

    /** The declared value, or null for an empty cell or ?DNC?. */
    public SimpleText get() { return value; }

    public SimpleTextString toSimpleTextString() { return new SimpleTextString(text); }

    public static List<SimpleTextTyped> fromStringList(List<SimpleTextString> list) {
        List<SimpleTextTyped> result = new ArrayList<SimpleTextTyped>();
        if (list != null) for (SimpleTextString s : list) result.add(new SimpleTextTyped(s));
        return result;
    }

    public static List<SimpleTextString> toStringList(List<SimpleTextTyped> list) {
        List<SimpleTextString> result = new ArrayList<SimpleTextString>();
        if (list != null) for (SimpleTextTyped t : list) result.add(t.toSimpleTextString());
        return result;
    }

    @Override
    public String toString() { return text; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SimpleTextTyped)) return false;
        SimpleTextTyped that = (SimpleTextTyped) o;
        return DNCString.equals(text) || DNCString.equals(that.text)
            || Objects.equals(text, that.text);
    }

    @Override
    public int hashCode() { return Objects.hash(text); }
}
