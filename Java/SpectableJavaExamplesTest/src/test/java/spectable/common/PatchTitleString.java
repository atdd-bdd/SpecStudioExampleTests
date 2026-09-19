package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class PatchTitleString {
    private static final String DNCString = "?DNC?";

    public String title;

    public PatchTitleString(String title) {
        this.title = title;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static PatchTitleString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 1, "PatchTitle");
        return new PatchTitleString(parts.get(0));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PatchTitleString)) return false;
        PatchTitleString that = (PatchTitleString) o;
        return (DNCString.equals(title) || DNCString.equals(that.title) || Objects.equals(title, that.title));
    }

    @Override
    public int hashCode() {
        return Objects.hash(title);
    }

    @Override
    public String toString() {
        return Tokens.token(title);
    }
}
