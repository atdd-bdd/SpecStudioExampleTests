package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class InputControlValuesString {
    private static final String DNCString = "?DNC?";

    public String frame;
    public String roll;
    public String remaining;

    public InputControlValuesString(String frame, String roll, String remaining) {
        this.frame = frame;
        this.roll = roll;
        this.remaining = remaining;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static InputControlValuesString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 3, "InputControlValues");
        return new InputControlValuesString(parts.get(0), parts.get(1), parts.get(2));
    }

    public InputControlValuesString(String text) {
        InputControlValuesString parsed = fromText(text);
        this.frame = parsed.frame;
        this.roll = parsed.roll;
        this.remaining = parsed.remaining;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InputControlValuesString)) return false;
        InputControlValuesString that = (InputControlValuesString) o;
        return (DNCString.equals(frame) || DNCString.equals(that.frame) || Objects.equals(frame, that.frame))
            && (DNCString.equals(roll) || DNCString.equals(that.roll) || Objects.equals(roll, that.roll))
            && (DNCString.equals(remaining) || DNCString.equals(that.remaining) || Objects.equals(remaining, that.remaining));
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, roll, remaining);
    }

    @Override
    public String toString() {
        return Tokens.token(frame) + " " + Tokens.token(roll) + " " + Tokens.token(remaining);
    }
}
