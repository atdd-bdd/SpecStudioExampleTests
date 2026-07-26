package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class IDValueTyped {
    public IDForm iD;
    public int value;

    public IDValueTyped(IDForm iD, int value) {
        this.iD = iD;
        this.value = value;
    }

    public IDValueTyped(IDValueString s) {
        this.iD = new IDForm(s.iD);
        this.value = Integer.parseInt(s.value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IDValueTyped)) return false;
        IDValueTyped that = (IDValueTyped) o;
        return Objects.equals(iD, that.iD)
            && Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(iD, value);
    }

    public IDValueString toIDValueString() {
        return new IDValueString(String.valueOf(iD), String.valueOf(value));
    }

    public static List<IDValueTyped> fromStringList(List<IDValueString> list) {
        List<IDValueTyped> result = new ArrayList<>();
        for (IDValueString s : list) result.add(new IDValueTyped(s));
        return result;
    }

    public static List<IDValueString> toStringList(List<IDValueTyped> list) {
        List<IDValueString> result = new ArrayList<>();
        for (IDValueTyped t : list) result.add(t.toIDValueString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("iD", iD == null ? null : iD.value);
        m.put("value", value);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static IDValueTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new IDValueTyped(
            new IDForm(Json.asString(Json.require(m, "iD"), "iD")),
            Json.asInt(Json.require(m, "value"), "value"));
    }

    public static IDValueTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<IDValueTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (IDValueTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<IDValueTyped> fromJSONList(String json) {
        List<IDValueTyped> result = new ArrayList<IDValueTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "IDValueTyped")));
        return result;
    }
}
