package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FrameValuesString {
    private static final String DNCString = "?DNC?";

    public String frame;
    public String roll1;
    public String roll2;
    public String roll3;
    public String score;
    public String totalScore;

    public FrameValuesString(String frame, String roll1, String roll2, String roll3, String score, String totalScore) {
        this.frame = frame;
        this.roll1 = roll1;
        this.roll2 = roll2;
        this.roll3 = roll3;
        this.score = score;
        this.totalScore = totalScore;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static FrameValuesString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 6, "FrameValues");
        return new FrameValuesString(parts.get(0), parts.get(1), parts.get(2), parts.get(3), parts.get(4), parts.get(5));
    }

    public FrameValuesString(String text) {
        FrameValuesString parsed = fromText(text);
        this.frame = parsed.frame;
        this.roll1 = parsed.roll1;
        this.roll2 = parsed.roll2;
        this.roll3 = parsed.roll3;
        this.score = parsed.score;
        this.totalScore = parsed.totalScore;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FrameValuesString)) return false;
        FrameValuesString that = (FrameValuesString) o;
        return (DNCString.equals(frame) || DNCString.equals(that.frame) || Objects.equals(frame, that.frame))
            && (DNCString.equals(roll1) || DNCString.equals(that.roll1) || Objects.equals(roll1, that.roll1))
            && (DNCString.equals(roll2) || DNCString.equals(that.roll2) || Objects.equals(roll2, that.roll2))
            && (DNCString.equals(roll3) || DNCString.equals(that.roll3) || Objects.equals(roll3, that.roll3))
            && (DNCString.equals(score) || DNCString.equals(that.score) || Objects.equals(score, that.score))
            && (DNCString.equals(totalScore) || DNCString.equals(that.totalScore) || Objects.equals(totalScore, that.totalScore));
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, roll1, roll2, roll3, score, totalScore);
    }

    @Override
    public String toString() {
        return Tokens.token(frame) + " " + Tokens.token(roll1) + " " + Tokens.token(roll2) + " " + Tokens.token(roll3) + " " + Tokens.token(score) + " " + Tokens.token(totalScore);
    }
}
