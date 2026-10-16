package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

/** Score as the glue uses it: the text read into the declared type. */
public class ScoreTyped {
    private static final String DNCString = "?DNC?";

    /** The cell as written. ?DNC? and an empty cell are kept as they came. */
    public final String text;
    private final Score value;   // null for an empty cell or ?DNC?

    public ScoreTyped(ScoreString s) {
        this.text  = s == null ? "" : s.value;
        this.value = (text.isEmpty() || DNCString.equals(text)) ? null
                   : new Score(text);
    }

    public ScoreTyped(Score value) {
        this.value = value;
        this.text  = value == null ? "" : value.toString();
    }

    public boolean hasValue() { return value != null; }

    /** The declared value, or null for an empty cell or ?DNC?. */
    public Score get() { return value; }

    public ScoreString toScoreString() { return new ScoreString(text); }

    public static List<ScoreTyped> fromStringList(List<ScoreString> list) {
        List<ScoreTyped> result = new ArrayList<ScoreTyped>();
        if (list != null) for (ScoreString s : list) result.add(new ScoreTyped(s));
        return result;
    }

    public static List<ScoreString> toStringList(List<ScoreTyped> list) {
        List<ScoreString> result = new ArrayList<ScoreString>();
        if (list != null) for (ScoreTyped t : list) result.add(t.toScoreString());
        return result;
    }

    @Override
    public String toString() { return text; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ScoreTyped)) return false;
        ScoreTyped that = (ScoreTyped) o;
        return DNCString.equals(text) || DNCString.equals(that.text)
            || Objects.equals(text, that.text);
    }

    @Override
    public int hashCode() { return Objects.hash(text); }
}
