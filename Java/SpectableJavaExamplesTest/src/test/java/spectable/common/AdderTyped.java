package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;

public class AdderTyped {
    public int number1;
    public int number2;
    public int result;

    public AdderTyped(int number1, int number2, int result) {
        this.number1 = number1;
        this.number2 = number2;
        this.result = result;
    }

    public AdderTyped(AdderString s) {
        this.number1 = Integer.parseInt(s.number1);
        this.number2 = Integer.parseInt(s.number2);
        this.result = Integer.parseInt(s.result);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AdderTyped)) return false;
        AdderTyped that = (AdderTyped) o;
        return Objects.equals(number1, that.number1)
            && Objects.equals(number2, that.number2)
            && Objects.equals(result, that.result);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number1, number2, result);
    }

    public AdderString toAdderString() {
        return new AdderString(String.valueOf(number1), String.valueOf(number2), String.valueOf(result));
    }

    public static List<AdderTyped> fromStringList(List<AdderString> list) {
        List<AdderTyped> result = new ArrayList<>();
        for (AdderString s : list) result.add(new AdderTyped(s));
        return result;
    }

    public static List<AdderString> toStringList(List<AdderTyped> list) {
        List<AdderString> result = new ArrayList<>();
        for (AdderTyped t : list) result.add(t.toAdderString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("number1", number1);
        m.put("number2", number2);
        m.put("result", result);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static AdderTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new AdderTyped(
            Json.asInt(Json.require(m, "number1"), "number1"),
            Json.asInt(Json.require(m, "number2"), "number2"),
            Json.asInt(Json.require(m, "result"), "result"));
    }

    public static AdderTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<AdderTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (AdderTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<AdderTyped> fromJSONList(String json) {
        List<AdderTyped> result = new ArrayList<AdderTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "AdderTyped")));
        return result;
    }
}
