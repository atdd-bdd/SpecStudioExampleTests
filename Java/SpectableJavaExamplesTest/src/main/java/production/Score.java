package production;

import java.util.Objects;

/**
 * A frame score or running total, or -1 (TBS) while the rolls it depends on have not
 * all been made.
 *
 * The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect game --
 * and rejects 301; -1 is valid only because the spec defines TBS as -1: a
 * frame ending in a strike or a spare cannot be scored until its bonus rolls
 * exist, and "not yet computable" is a normal state rather than an error.
 */
public class Score {
    /** Marker for a score that cannot be computed yet: the integer the spec defines TBS as. */
    public static final int TBS_VALUE = -1;
    public static final Score TBS = new Score(TBS_VALUE);

    public static final int MIN = 0;
    public static final int MAX = 300;

    public final int value;

    /** From the text form, which is what a table cell holds. */
    public Score(String text) {
        this(Integer.parseInt(text == null ? "" : text.trim()));
    }

    public Score(int points) {
        if (points != TBS_VALUE && (points < MIN || points > MAX))
            throw new NumberFormatException(
                "Score must be between " + MIN + " and " + MAX + ", got " + points);
        this.value = points;
    }

    public boolean isComputable() {
        return value != TBS_VALUE;
    }

    /** Points, or -1 when not yet computable. */
    public int points() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Score)) return false;
        return value == ((Score) o).value;
    }

    @Override
    public int hashCode() { return Objects.hash(value); }

    /** The text form: what a table cell holds. */
    @Override
    public String toString() { return String.valueOf(value); }
}
