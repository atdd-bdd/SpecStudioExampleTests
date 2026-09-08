package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class RequestTyped {
    public String method;
    public String page;
    public String address;
    public String benchmark;
    public String format;

    public RequestTyped(String method, String page, String address, String benchmark, String format) {
        this.method = method;
        this.page = page;
        this.address = address;
        this.benchmark = benchmark;
        this.format = format;
    }

    public RequestTyped(RequestString s) {
        this.method = s.method;
        this.page = s.page;
        this.address = s.address;
        this.benchmark = s.benchmark;
        this.format = s.format;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RequestTyped)) return false;
        RequestTyped that = (RequestTyped) o;
        return Objects.equals(method, that.method)
            && Objects.equals(page, that.page)
            && Objects.equals(address, that.address)
            && Objects.equals(benchmark, that.benchmark)
            && Objects.equals(format, that.format);
    }

    @Override
    public int hashCode() {
        return Objects.hash(method, page, address, benchmark, format);
    }

    public RequestString toRequestString() {
        return new RequestString(String.valueOf(method), String.valueOf(page), String.valueOf(address), String.valueOf(benchmark), String.valueOf(format));
    }

    public static List<RequestTyped> fromStringList(List<RequestString> list) {
        List<RequestTyped> result = new ArrayList<>();
        for (RequestString s : list) result.add(new RequestTyped(s));
        return result;
    }

    public static List<RequestString> toStringList(List<RequestTyped> list) {
        List<RequestString> result = new ArrayList<>();
        for (RequestTyped t : list) result.add(t.toRequestString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("method", method);
        m.put("page", page);
        m.put("address", address);
        m.put("benchmark", benchmark);
        m.put("format", format);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static RequestTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new RequestTyped(
            Json.asString(Json.require(m, "method"), "method"),
            Json.asString(Json.require(m, "page"), "page"),
            Json.asString(Json.require(m, "address"), "address"),
            Json.asString(Json.require(m, "benchmark"), "benchmark"),
            Json.asString(Json.require(m, "format"), "format"));
    }

    public static RequestTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<RequestTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (RequestTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<RequestTyped> fromJSONList(String json) {
        List<RequestTyped> result = new ArrayList<RequestTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "RequestTyped")));
        return result;
    }
}
