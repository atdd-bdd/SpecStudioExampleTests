package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ApiStatusTyped {
    public int code;

    public ApiStatusTyped(int code) {
        this.code = code;
    }

    public ApiStatusTyped(ApiStatusString s) {
        this.code = Integer.parseInt(s.code);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApiStatusTyped)) return false;
        ApiStatusTyped that = (ApiStatusTyped) o;
        return Objects.equals(code, that.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }

    public ApiStatusString toApiStatusString() {
        return new ApiStatusString(String.valueOf(code));
    }

    public static List<ApiStatusTyped> fromStringList(List<ApiStatusString> list) {
        List<ApiStatusTyped> result = new ArrayList<>();
        for (ApiStatusString s : list) result.add(new ApiStatusTyped(s));
        return result;
    }

    public static List<ApiStatusString> toStringList(List<ApiStatusTyped> list) {
        List<ApiStatusString> result = new ArrayList<>();
        for (ApiStatusTyped t : list) result.add(t.toApiStatusString());
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
    public static ApiStatusTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ApiStatusTyped(
            Json.asInt(Json.require(m, "code"), "code"));
    }

    public static ApiStatusTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ApiStatusTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ApiStatusTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ApiStatusTyped> fromJSONList(String json) {
        List<ApiStatusTyped> result = new ArrayList<ApiStatusTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ApiStatusTyped")));
        return result;
    }
}
