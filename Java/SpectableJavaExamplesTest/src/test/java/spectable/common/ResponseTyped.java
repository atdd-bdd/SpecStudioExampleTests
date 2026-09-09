package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ResponseTyped {
    public ResultTyped result;

    public ResponseTyped(ResultTyped result) {
        this.result = result;
    }

    public ResponseTyped(ResponseString s) {
        this.result = new ResultTyped(s.result);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResponseTyped)) return false;
        ResponseTyped that = (ResponseTyped) o;
        return Objects.equals(result, that.result);
    }

    @Override
    public int hashCode() {
        return Objects.hash(result);
    }

    public ResponseString toResponseString() {
        return new ResponseString(result.toResultString());
    }

    public static List<ResponseTyped> fromStringList(List<ResponseString> list) {
        List<ResponseTyped> result = new ArrayList<>();
        for (ResponseString s : list) result.add(new ResponseTyped(s));
        return result;
    }

    public static List<ResponseString> toStringList(List<ResponseTyped> list) {
        List<ResponseString> result = new ArrayList<>();
        for (ResponseTyped t : list) result.add(t.toResponseString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("result", result == null ? null : result.toJsonValue());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ResponseTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ResponseTyped(
            ResultTyped.fromJsonValue(Json.asObject(Json.require(m, "result"), "result")));
    }

    public static ResponseTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ResponseTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ResponseTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ResponseTyped> fromJSONList(String json) {
        List<ResponseTyped> result = new ArrayList<ResponseTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ResponseTyped")));
        return result;
    }
}
