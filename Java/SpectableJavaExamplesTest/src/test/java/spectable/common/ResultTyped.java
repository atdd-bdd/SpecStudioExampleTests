package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResultTyped {
    public int matchCount;

    public ResultTyped(int matchCount) {
        this.matchCount = matchCount;
    }

    public ResultTyped(ResultString s) {
        this.matchCount = Integer.parseInt(s.matchCount);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultTyped)) return false;
        ResultTyped that = (ResultTyped) o;
        return Objects.equals(matchCount, that.matchCount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matchCount);
    }

    public ResultString toResultString() {
        return new ResultString(String.valueOf(matchCount));
    }

    public static List<ResultTyped> fromStringList(List<ResultString> list) {
        List<ResultTyped> result = new ArrayList<>();
        for (ResultString s : list) result.add(new ResultTyped(s));
        return result;
    }

    public static List<ResultString> toStringList(List<ResultTyped> list) {
        List<ResultString> result = new ArrayList<>();
        for (ResultTyped t : list) result.add(t.toResultString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("matchCount", matchCount);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ResultTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ResultTyped(
            Json.asInt(Json.require(m, "matchCount"), "matchCount"));
    }

    public static ResultTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ResultTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ResultTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ResultTyped> fromJSONList(String json) {
        List<ResultTyped> result = new ArrayList<ResultTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ResultTyped")));
        return result;
    }
}
