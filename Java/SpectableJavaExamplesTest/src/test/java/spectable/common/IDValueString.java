package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class IDValueString {
    private static final String DNCString = "?DNC?";

    public String iD;
    public String value;

    public IDValueString(String iD, String value) {
        this.iD = iD;
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IDValueString)) return false;
        IDValueString that = (IDValueString) o;
        return (DNCString.equals(iD) || DNCString.equals(that.iD) || Objects.equals(iD, that.iD))
            && (DNCString.equals(value) || DNCString.equals(that.value) || Objects.equals(value, that.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(iD, value);
    }

    @Override
    public String toString() {
        return "ID=" + iD + ", " + "Value=" + value;
    }
}
