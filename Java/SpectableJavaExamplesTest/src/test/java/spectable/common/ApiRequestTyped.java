package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ApiRequestTyped {
    public String method;
    public String page;
    public String parameter;
    public String body;

    public ApiRequestTyped(String method, String page, String parameter, String body) {
        this.method = method;
        this.page = page;
        this.parameter = parameter;
        this.body = body;
    }

    public ApiRequestTyped(ApiRequestString s) {
        this.method = s.method;
        this.page = s.page;
        this.parameter = s.parameter;
        this.body = s.body;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApiRequestTyped)) return false;
        ApiRequestTyped that = (ApiRequestTyped) o;
        return Objects.equals(method, that.method)
            && Objects.equals(page, that.page)
            && Objects.equals(parameter, that.parameter)
            && Objects.equals(body, that.body);
    }

    @Override
    public int hashCode() {
        return Objects.hash(method, page, parameter, body);
    }

    public ApiRequestString toApiRequestString() {
        return new ApiRequestString(String.valueOf(method), String.valueOf(page), String.valueOf(parameter), String.valueOf(body));
    }

    public static List<ApiRequestTyped> fromStringList(List<ApiRequestString> list) {
        List<ApiRequestTyped> result = new ArrayList<>();
        for (ApiRequestString s : list) result.add(new ApiRequestTyped(s));
        return result;
    }

    public static List<ApiRequestString> toStringList(List<ApiRequestTyped> list) {
        List<ApiRequestString> result = new ArrayList<>();
        for (ApiRequestTyped t : list) result.add(t.toApiRequestString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("method", method);
        m.put("page", page);
        m.put("parameter", parameter);
        m.put("body", body);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ApiRequestTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ApiRequestTyped(
            Json.asString(Json.require(m, "method"), "method"),
            Json.asString(Json.require(m, "page"), "page"),
            Json.asString(Json.require(m, "parameter"), "parameter"),
            Json.asString(Json.require(m, "body"), "body"));
    }

    public static ApiRequestTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ApiRequestTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ApiRequestTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ApiRequestTyped> fromJSONList(String json) {
        List<ApiRequestTyped> result = new ArrayList<ApiRequestTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ApiRequestTyped")));
        return result;
    }
}
