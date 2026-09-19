package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FrameValuesTyped {
    public int frame;
    public Pins roll1;
    public Pins roll2;
    public Pins roll3;
    public Score score;
    public Score totalScore;

    public FrameValuesTyped(int frame, Pins roll1, Pins roll2, Pins roll3, Score score, Score totalScore) {
        this.frame = frame;
        this.roll1 = roll1;
        this.roll2 = roll2;
        this.roll3 = roll3;
        this.score = score;
        this.totalScore = totalScore;
    }

    public FrameValuesTyped(FrameValuesString s) {
        this.frame = Integer.parseInt(s.frame);
        this.roll1 = new Pins(s.roll1);
        this.roll2 = new Pins(s.roll2);
        this.roll3 = new Pins(s.roll3);
        this.score = new Score(s.score);
        this.totalScore = new Score(s.totalScore);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FrameValuesTyped)) return false;
        FrameValuesTyped that = (FrameValuesTyped) o;
        return Objects.equals(frame, that.frame)
            && Objects.equals(roll1, that.roll1)
            && Objects.equals(roll2, that.roll2)
            && Objects.equals(roll3, that.roll3)
            && Objects.equals(score, that.score)
            && Objects.equals(totalScore, that.totalScore);
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, roll1, roll2, roll3, score, totalScore);
    }

    public FrameValuesString toFrameValuesString() {
        return new FrameValuesString(String.valueOf(frame), String.valueOf(roll1), String.valueOf(roll2), String.valueOf(roll3), String.valueOf(score), String.valueOf(totalScore));
    }

    public static List<FrameValuesTyped> fromStringList(List<FrameValuesString> list) {
        List<FrameValuesTyped> result = new ArrayList<>();
        for (FrameValuesString s : list) result.add(new FrameValuesTyped(s));
        return result;
    }

    public static List<FrameValuesString> toStringList(List<FrameValuesTyped> list) {
        List<FrameValuesString> result = new ArrayList<>();
        for (FrameValuesTyped t : list) result.add(t.toFrameValuesString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("frame", frame);
        m.put("roll1", roll1 == null ? null : roll1.toString());
        m.put("roll2", roll2 == null ? null : roll2.toString());
        m.put("roll3", roll3 == null ? null : roll3.toString());
        m.put("score", score == null ? null : score.toString());
        m.put("totalScore", totalScore == null ? null : totalScore.toString());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static FrameValuesTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new FrameValuesTyped(
            Json.asInt(Json.require(m, "frame"), "frame"),
            new Pins(Json.asString(Json.require(m, "roll1"), "roll1")),
            new Pins(Json.asString(Json.require(m, "roll2"), "roll2")),
            new Pins(Json.asString(Json.require(m, "roll3"), "roll3")),
            new Score(Json.asString(Json.require(m, "score"), "score")),
            new Score(Json.asString(Json.require(m, "totalScore"), "totalScore")));
    }

    public static FrameValuesTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<FrameValuesTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (FrameValuesTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<FrameValuesTyped> fromJSONList(String json) {
        List<FrameValuesTyped> result = new ArrayList<FrameValuesTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "FrameValuesTyped")));
        return result;
    }
}
