package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FandCString {
    private static final String DNCString = "?DNC?";

    public String f;
    public String c;
    public String notes;

    public FandCString(String f, String c, String notes) {
        this.f = f;
        this.c = c;
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FandCString)) return false;
        FandCString that = (FandCString) o;
        return (DNCString.equals(f) || DNCString.equals(that.f) || Objects.equals(f, that.f))
            && (DNCString.equals(c) || DNCString.equals(that.c) || Objects.equals(c, that.c))
            && (DNCString.equals(notes) || DNCString.equals(that.notes) || Objects.equals(notes, that.notes));
    }

    @Override
    public int hashCode() {
        return Objects.hash(f, c, notes);
    }

    @Override
    public String toString() {
        return "F=" + f + ", " + "C=" + c + ", " + "Notes=" + notes;
    }
}
