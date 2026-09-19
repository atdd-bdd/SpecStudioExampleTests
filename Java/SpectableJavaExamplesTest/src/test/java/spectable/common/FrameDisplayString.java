package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FrameDisplayString {
    private static final String DNCString = "?DNC?";

    public String frame;
    public String mark1;
    public String mark2;
    public String mark3;
    public String totalScore;

    public FrameDisplayString(String frame, String mark1, String mark2, String mark3, String totalScore) {
        this.frame = frame;
        this.mark1 = mark1;
        this.mark2 = mark2;
        this.mark3 = mark3;
        this.totalScore = totalScore;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static FrameDisplayString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 5, "FrameDisplay");
        return new FrameDisplayString(parts.get(0), parts.get(1), parts.get(2), parts.get(3), parts.get(4));
    }

    public FrameDisplayString(String text) {
        FrameDisplayString parsed = fromText(text);
        this.frame = parsed.frame;
        this.mark1 = parsed.mark1;
        this.mark2 = parsed.mark2;
        this.mark3 = parsed.mark3;
        this.totalScore = parsed.totalScore;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FrameDisplayString)) return false;
        FrameDisplayString that = (FrameDisplayString) o;
        return (DNCString.equals(frame) || DNCString.equals(that.frame) || Objects.equals(frame, that.frame))
            && (DNCString.equals(mark1) || DNCString.equals(that.mark1) || Objects.equals(mark1, that.mark1))
            && (DNCString.equals(mark2) || DNCString.equals(that.mark2) || Objects.equals(mark2, that.mark2))
            && (DNCString.equals(mark3) || DNCString.equals(that.mark3) || Objects.equals(mark3, that.mark3))
            && (DNCString.equals(totalScore) || DNCString.equals(that.totalScore) || Objects.equals(totalScore, that.totalScore));
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, mark1, mark2, mark3, totalScore);
    }

    @Override
    public String toString() {
        return Tokens.token(frame) + " " + Tokens.token(mark1) + " " + Tokens.token(mark2) + " " + Tokens.token(mark3) + " " + Tokens.token(totalScore);
    }
}
