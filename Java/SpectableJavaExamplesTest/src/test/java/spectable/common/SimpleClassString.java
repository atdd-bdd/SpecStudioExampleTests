package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class SimpleClassString {
    private static final String DNCString = "?DNC?";

    public String anInt;
    public String aString;

    public SimpleClassString(String anInt, String aString) {
        this.anInt = anInt;
        this.aString = aString;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SimpleClassString)) return false;
        SimpleClassString that = (SimpleClassString) o;
        return (DNCString.equals(anInt) || DNCString.equals(that.anInt) || Objects.equals(anInt, that.anInt))
            && (DNCString.equals(aString) || DNCString.equals(that.aString) || Objects.equals(aString, that.aString));
    }

    @Override
    public int hashCode() {
        return Objects.hash(anInt, aString);
    }

    @Override
    public String toString() {
        return "anInt=" + anInt + ", " + "aString=" + aString;
    }
}
