package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FrameValuesString {
    private static final String DNCString = "?DNC?";

    public String frame;
    public PinsString roll1;
    public PinsString roll2;
    public PinsString roll3;
    public ScoreString score;
    public ScoreString totalScore;

    public FrameValuesString(String frame, String roll1, String roll2, String roll3, String score, String totalScore) {
        this.frame = frame;
        this.roll1 = new PinsString(roll1);
        this.roll2 = new PinsString(roll2);
        this.roll3 = new PinsString(roll3);
        this.score = new ScoreString(score);
        this.totalScore = new ScoreString(totalScore);
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
            && (DNCString.equals(roll1.value) || DNCString.equals(that.roll1.value) || Objects.equals(roll1.value, that.roll1.value))
            && (DNCString.equals(roll2.value) || DNCString.equals(that.roll2.value) || Objects.equals(roll2.value, that.roll2.value))
            && (DNCString.equals(roll3.value) || DNCString.equals(that.roll3.value) || Objects.equals(roll3.value, that.roll3.value))
            && (DNCString.equals(score.value) || DNCString.equals(that.score.value) || Objects.equals(score.value, that.score.value))
            && (DNCString.equals(totalScore.value) || DNCString.equals(that.totalScore.value) || Objects.equals(totalScore.value, that.totalScore.value));
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, roll1, roll2, roll3, score, totalScore);
    }

    @Override
    public String toString() {
        return Tokens.token(frame) + " " + Tokens.token(roll1.value) + " " + Tokens.token(roll2.value) + " " + Tokens.token(roll3.value) + " " + Tokens.token(score.value) + " " + Tokens.token(totalScore.value);
    }
}
