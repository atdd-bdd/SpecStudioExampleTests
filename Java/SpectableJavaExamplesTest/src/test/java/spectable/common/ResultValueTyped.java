package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResultValueTyped {
    public int sum;

    public ResultValueTyped(int sum) {
        this.sum = sum;
    }

    public ResultValueTyped(ResultValueString s) {
        this.sum = Integer.parseInt(s.sum);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultValueTyped)) return false;
        ResultValueTyped that = (ResultValueTyped) o;
        return Objects.equals(sum, that.sum);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sum);
    }

    public ResultValueString toResultValueString() {
        return new ResultValueString(String.valueOf(sum));
    }

    public static List<ResultValueTyped> fromStringList(List<ResultValueString> list) {
        List<ResultValueTyped> result = new ArrayList<>();
        for (ResultValueString s : list) result.add(new ResultValueTyped(s));
        return result;
    }

    public static List<ResultValueString> toStringList(List<ResultValueTyped> list) {
        List<ResultValueString> result = new ArrayList<>();
        for (ResultValueTyped t : list) result.add(t.toResultValueString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("sum", sum);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ResultValueTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ResultValueTyped(
            Json.asInt(Json.require(m, "sum"), "sum"));
    }

    public static ResultValueTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ResultValueTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ResultValueTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ResultValueTyped> fromJSONList(String json) {
        List<ResultValueTyped> result = new ArrayList<ResultValueTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ResultValueTyped")));
        return result;
    }
}
