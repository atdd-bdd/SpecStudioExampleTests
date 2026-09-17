package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FilterValueTyped {
    public IDForm value;

    public FilterValueTyped(IDForm value) {
        this.value = value;
    }

    public FilterValueTyped(FilterValueString s) {
        this.value = new IDForm(s.value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FilterValueTyped)) return false;
        FilterValueTyped that = (FilterValueTyped) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    public FilterValueString toFilterValueString() {
        return new FilterValueString(String.valueOf(value));
    }

    public static List<FilterValueTyped> fromStringList(List<FilterValueString> list) {
        List<FilterValueTyped> result = new ArrayList<>();
        for (FilterValueString s : list) result.add(new FilterValueTyped(s));
        return result;
    }

    public static List<FilterValueString> toStringList(List<FilterValueTyped> list) {
        List<FilterValueString> result = new ArrayList<>();
        for (FilterValueTyped t : list) result.add(t.toFilterValueString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("value", value == null ? null : value.toString());
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static FilterValueTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new FilterValueTyped(
            new IDForm(Json.asString(Json.require(m, "value"), "value")));
    }

    public static FilterValueTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<FilterValueTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (FilterValueTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<FilterValueTyped> fromJSONList(String json) {
        List<FilterValueTyped> result = new ArrayList<FilterValueTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "FilterValueTyped")));
        return result;
    }
}
