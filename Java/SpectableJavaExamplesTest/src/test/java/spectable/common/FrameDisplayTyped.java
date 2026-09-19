package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FrameDisplayTyped {
    public String frame;
    public String mark1;
    public String mark2;
    public String mark3;
    public String totalScore;

    public FrameDisplayTyped(String frame, String mark1, String mark2, String mark3, String totalScore) {
        this.frame = frame;
        this.mark1 = mark1;
        this.mark2 = mark2;
        this.mark3 = mark3;
        this.totalScore = totalScore;
    }

    public FrameDisplayTyped(FrameDisplayString s) {
        this.frame = s.frame;
        this.mark1 = s.mark1;
        this.mark2 = s.mark2;
        this.mark3 = s.mark3;
        this.totalScore = s.totalScore;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FrameDisplayTyped)) return false;
        FrameDisplayTyped that = (FrameDisplayTyped) o;
        return Objects.equals(frame, that.frame)
            && Objects.equals(mark1, that.mark1)
            && Objects.equals(mark2, that.mark2)
            && Objects.equals(mark3, that.mark3)
            && Objects.equals(totalScore, that.totalScore);
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, mark1, mark2, mark3, totalScore);
    }

    public FrameDisplayString toFrameDisplayString() {
        return new FrameDisplayString(String.valueOf(frame), String.valueOf(mark1), String.valueOf(mark2), String.valueOf(mark3), String.valueOf(totalScore));
    }

    public static List<FrameDisplayTyped> fromStringList(List<FrameDisplayString> list) {
        List<FrameDisplayTyped> result = new ArrayList<>();
        for (FrameDisplayString s : list) result.add(new FrameDisplayTyped(s));
        return result;
    }

    public static List<FrameDisplayString> toStringList(List<FrameDisplayTyped> list) {
        List<FrameDisplayString> result = new ArrayList<>();
        for (FrameDisplayTyped t : list) result.add(t.toFrameDisplayString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("frame", frame);
        m.put("mark1", mark1);
        m.put("mark2", mark2);
        m.put("mark3", mark3);
        m.put("totalScore", totalScore);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static FrameDisplayTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new FrameDisplayTyped(
            Json.asString(Json.require(m, "frame"), "frame"),
            Json.asString(Json.require(m, "mark1"), "mark1"),
            Json.asString(Json.require(m, "mark2"), "mark2"),
            Json.asString(Json.require(m, "mark3"), "mark3"),
            Json.asString(Json.require(m, "totalScore"), "totalScore"));
    }

    public static FrameDisplayTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<FrameDisplayTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (FrameDisplayTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<FrameDisplayTyped> fromJSONList(String json) {
        List<FrameDisplayTyped> result = new ArrayList<FrameDisplayTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "FrameDisplayTyped")));
        return result;
    }
}
