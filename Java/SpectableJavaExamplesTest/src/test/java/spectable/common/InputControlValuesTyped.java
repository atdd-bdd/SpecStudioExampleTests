package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class InputControlValuesTyped {
    public int frame;
    public Pins roll;
    public Pins remaining;

    public InputControlValuesTyped(int frame, Pins roll, Pins remaining) {
        this.frame = frame;
        this.roll = roll;
        this.remaining = remaining;
    }

    public InputControlValuesTyped(InputControlValuesString s) {
        this.frame = Integer.parseInt(s.frame);
        this.roll = new Pins(s.roll);
        this.remaining = new Pins(s.remaining);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InputControlValuesTyped)) return false;
        InputControlValuesTyped that = (InputControlValuesTyped) o;
        return Objects.equals(frame, that.frame)
            && Objects.equals(roll, that.roll)
            && Objects.equals(remaining, that.remaining);
    }

    @Override
    public int hashCode() {
        return Objects.hash(frame, roll, remaining);
    }

    public InputControlValuesString toInputControlValuesString() {
        return new InputControlValuesString(String.valueOf(frame), String.valueOf(roll), String.valueOf(remaining));
    }

    public static List<InputControlValuesTyped> fromStringList(List<InputControlValuesString> list) {
        List<InputControlValuesTyped> result = new ArrayList<>();
        for (InputControlValuesString s : list) result.add(new InputControlValuesTyped(s));
        return result;
    }

    public static List<InputControlValuesString> toStringList(List<InputControlValuesTyped> list) {
        List<InputControlValuesString> result = new ArrayList<>();
        for (InputControlValuesTyped t : list) result.add(t.toInputControlValuesString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("frame", frame);
        m.put("roll", roll == null ? null : roll.toString());
        m.put("remaining", remaining == null ? null : remaining.toString());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static InputControlValuesTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new InputControlValuesTyped(
            Json.asInt(Json.require(m, "frame"), "frame"),
            new Pins(Json.asString(Json.require(m, "roll"), "roll")),
            new Pins(Json.asString(Json.require(m, "remaining"), "remaining")));
    }

    public static InputControlValuesTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<InputControlValuesTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (InputControlValuesTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<InputControlValuesTyped> fromJSONList(String json) {
        List<InputControlValuesTyped> result = new ArrayList<InputControlValuesTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "InputControlValuesTyped")));
        return result;
    }
}
