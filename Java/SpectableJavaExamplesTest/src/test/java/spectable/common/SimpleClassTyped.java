package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class SimpleClassTyped {
    public int anInt;
    public String aString;

    public SimpleClassTyped(int anInt, String aString) {
        this.anInt = anInt;
        this.aString = aString;
    }

    public SimpleClassTyped(SimpleClassString s) {
        this.anInt = Integer.parseInt(s.anInt);
        this.aString = s.aString;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SimpleClassTyped)) return false;
        SimpleClassTyped that = (SimpleClassTyped) o;
        return Objects.equals(anInt, that.anInt)
            && Objects.equals(aString, that.aString);
    }

    @Override
    public int hashCode() {
        return Objects.hash(anInt, aString);
    }

    public SimpleClassString toSimpleClassString() {
        return new SimpleClassString(String.valueOf(anInt), String.valueOf(aString));
    }

    public static List<SimpleClassTyped> fromStringList(List<SimpleClassString> list) {
        List<SimpleClassTyped> result = new ArrayList<>();
        for (SimpleClassString s : list) result.add(new SimpleClassTyped(s));
        return result;
    }

    public static List<SimpleClassString> toStringList(List<SimpleClassTyped> list) {
        List<SimpleClassString> result = new ArrayList<>();
        for (SimpleClassTyped t : list) result.add(t.toSimpleClassString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("anInt", anInt);
        m.put("aString", aString);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static SimpleClassTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new SimpleClassTyped(
            Json.asInt(Json.require(m, "anInt"), "anInt"),
            Json.asString(Json.require(m, "aString"), "aString"));
    }

    public static SimpleClassTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<SimpleClassTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (SimpleClassTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<SimpleClassTyped> fromJSONList(String json) {
        List<SimpleClassTyped> result = new ArrayList<SimpleClassTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "SimpleClassTyped")));
        return result;
    }
}
