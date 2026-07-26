package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class EnumerationValuesString {
    private static final String DNCString = "?DNC?";

    public String value;
    public String notes;

    public EnumerationValuesString(String value, String notes) {
        this.value = value;
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EnumerationValuesString)) return false;
        EnumerationValuesString that = (EnumerationValuesString) o;
        return (DNCString.equals(value) || DNCString.equals(that.value) || Objects.equals(value, that.value))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(value, notes);
    }

    @Override
    public String toString() {
        return "Value=" + value + ", " + "Notes=" + notes;
    }
}
