package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** IDForm as the glue uses it: the text read into the declared type. */
public class IDFormTyped {
    private static final String DNCString = "?DNC?";

    /** The cell as written. ?DNC? and an empty cell are kept as they came. */
    public final String text;
    private final IDForm value;   // null for an empty cell or ?DNC?

    public IDFormTyped(IDFormString s) {
        this.text  = s == null ? "" : s.value;
        this.value = (text.isEmpty() || DNCString.equals(text)) ? null
                   : new IDForm(text);
    }

    public IDFormTyped(IDForm value) {
        this.value = value;
        this.text  = value == null ? "" : value.toString();
    }

    public boolean hasValue() { return value != null; }

    /** The declared value, or null for an empty cell or ?DNC?. */
    public IDForm get() { return value; }

    public IDFormString toIDFormString() { return new IDFormString(text); }

    public static List<IDFormTyped> fromStringList(List<IDFormString> list) {
        List<IDFormTyped> result = new ArrayList<IDFormTyped>();
        if (list != null) for (IDFormString s : list) result.add(new IDFormTyped(s));
        return result;
    }

    public static List<IDFormString> toStringList(List<IDFormTyped> list) {
        List<IDFormString> result = new ArrayList<IDFormString>();
        if (list != null) for (IDFormTyped t : list) result.add(t.toIDFormString());
        return result;
    }

    @Override
    public String toString() { return text; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IDFormTyped)) return false;
        IDFormTyped that = (IDFormTyped) o;
        return DNCString.equals(text) || DNCString.equals(that.text)
            || Objects.equals(text, that.text);
    }

    @Override
    public int hashCode() { return Objects.hash(text); }
}
