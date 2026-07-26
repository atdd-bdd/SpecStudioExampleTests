package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class SomeTypesString {
    private static final String DNCString = "?DNC?";

    public String anInt;
    public String aDouble;
    public String aChar;
    public String achar1;

    public SomeTypesString(String anInt, String aDouble, String aChar, String achar1) {
        this.anInt = anInt;
        this.aDouble = aDouble;
        this.aChar = aChar;
        this.achar1 = achar1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SomeTypesString)) return false;
        SomeTypesString that = (SomeTypesString) o;
        return (DNCString.equals(anInt) || DNCString.equals(that.anInt) || Objects.equals(anInt, that.anInt))
            && (DNCString.equals(aDouble) || DNCString.equals(that.aDouble) || Objects.equals(aDouble, that.aDouble))
            && (DNCString.equals(aChar) || DNCString.equals(that.aChar) || Objects.equals(aChar, that.aChar))
            && (DNCString.equals(achar1) || DNCString.equals(that.achar1) || Objects.equals(achar1, that.achar1));
    }

    @Override
    public int hashCode() {
        return Objects.hash(anInt, aDouble, aChar, achar1);
    }

    @Override
    public String toString() {
        return "anInt=" + anInt + ", " + "aDouble=" + aDouble + ", " + "aChar=" + aChar + ", " + "achar1=" + achar1;
    }
}
