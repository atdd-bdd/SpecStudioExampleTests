package spectable.common;

import java.util.Objects;
import production.*;

public class ValidValuesString {
    private static final String DNCString = "?DNC?";

    public String value;
    public String isValid;
    public String notes;

    public ValidValuesString(String value, String isValid, String notes) {
        this.value = value;
        this.isValid = isValid;
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ValidValuesString)) return false;
        ValidValuesString that = (ValidValuesString) o;
        return (DNCString.equals(value) || DNCString.equals(that.value) || Objects.equals(value, that.value))
            && (DNCString.equals(isValid) || DNCString.equals(that.isValid) || Objects.equals(isValid, that.isValid))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(value, isValid, notes);
    }

    @Override
    public String toString() {
        return "Value=" + value + ", " + "IsValid=" + isValid + ", " + "Notes=" + notes;
    }
}
