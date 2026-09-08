package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class StatusTyped {
    public int code;

    public StatusTyped(int code) {
        this.code = code;
    }

    public StatusTyped(StatusString s) {
        this.code = Integer.parseInt(s.code);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StatusTyped)) return false;
        StatusTyped that = (StatusTyped) o;
        return Objects.equals(code, that.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }

    public StatusString toStatusString() {
        return new StatusString(String.valueOf(code));
    }

    public static List<StatusTyped> fromStringList(List<StatusString> list) {
        List<StatusTyped> result = new ArrayList<>();
        for (StatusString s : list) result.add(new StatusTyped(s));
        return result;
    }

    public static List<StatusString> toStringList(List<StatusTyped> list) {
        List<StatusString> result = new ArrayList<>();
        for (StatusTyped t : list) result.add(t.toStatusString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("code", code);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static StatusTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new StatusTyped(
            Json.asInt(Json.require(m, "code"), "code"));
    }

    public static StatusTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<StatusTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (StatusTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<StatusTyped> fromJSONList(String json) {
        List<StatusTyped> result = new ArrayList<StatusTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "StatusTyped")));
        return result;
    }
}
