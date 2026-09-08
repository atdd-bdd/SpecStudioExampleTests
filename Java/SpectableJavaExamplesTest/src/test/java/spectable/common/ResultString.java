package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResultString {
    private static final String DNCString = "?DNC?";

    public String matchCount;

    public ResultString(String matchCount) {
        this.matchCount = matchCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultString)) return false;
        ResultString that = (ResultString) o;
        return (DNCString.equals(matchCount) || DNCString.equals(that.matchCount) || Objects.equals(matchCount, that.matchCount));
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchCount);
    }

    @Override
    public String toString() {
        return "MatchCount=" + matchCount;
    }
}
