package production;

import java.util.Objects;

/**
 * The number of pins knocked down by one roll, or -1 (TBR) when the roll has not
 * happened yet.
 *
 * The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and -2
 * are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls that
 * are still to come. The generated DataType test builds a Pins from each row and
 * expects a NumberFormatException for exactly the invalid ones, so a number out
 * of range has to fail the same way an unparseable one does.
 */
public class Pins {
    /** Marker for a roll that has not been made: the integer the spec defines TBR as. */
    public static final int TBR_VALUE = -1;
    public static final Pins TBR = new Pins(TBR_VALUE);

    public static final int MAX = 10;

    public final int value;

    /** From the text form, which is what a table cell holds. */
    public Pins(String text) {
        // parseInt throws NumberFormatException on anything non-numeric.
        this(Integer.parseInt(text == null ? "" : text.trim()));
    }

    public Pins(int count) {
        if (count != TBR_VALUE && (count < 0 || count > MAX))
            throw new NumberFormatException("Roll must be between 0 and " + MAX + ", got " + count);
        this.value = count;
    }

    /** False when this is TBR -- the roll has not been made. */
    public boolean isRolled() {
        return value != TBR_VALUE;
    }

    /** Pin count, or -1 when the roll has not been made. */
    public int count() {
        return value;
    }

    public boolean isStrike() {
        return isRolled() && value == MAX;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pins)) return false;
        return value == ((Pins) o).value;
    }

    @Override
    public int hashCode() { return Objects.hash(value); }

    /** The text form: what a table cell holds. */
    @Override
    public String toString() { return String.valueOf(value); }
}
