package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ValidValuesTyped {
    public String value;
    public YesNo isValid;
    public String notes;

    public ValidValuesTyped(String value, YesNo isValid, String notes) {
        this.value = value;
        this.isValid = isValid;
        this.notes = notes;
    }

    public ValidValuesTyped(ValidValuesString s) {
        this.value = s.value;
        this.isValid = new YesNo(s.isValid);
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ValidValuesTyped)) return false;
        ValidValuesTyped that = (ValidValuesTyped) o;
        return Objects.equals(value, that.value)
            && Objects.equals(isValid, that.isValid)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value, isValid, notes);
    }

    public ValidValuesString toValidValuesString() {
        return new ValidValuesString(String.valueOf(value), String.valueOf(isValid), String.valueOf(notes));
    }

    public static List<ValidValuesTyped> fromStringList(List<ValidValuesString> list) {
        List<ValidValuesTyped> result = new ArrayList<>();
        for (ValidValuesString s : list) result.add(new ValidValuesTyped(s));
        return result;
    }

    public static List<ValidValuesString> toStringList(List<ValidValuesTyped> list) {
        List<ValidValuesString> result = new ArrayList<>();
        for (ValidValuesTyped t : list) result.add(t.toValidValuesString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("value", value);
        m.put("isValid", isValid == null ? null : isValid.value);
        m.put("notes", notes);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ValidValuesTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ValidValuesTyped(
            Json.asString(Json.require(m, "value"), "value"),
            new YesNo(Json.asString(Json.require(m, "isValid"), "isValid")),
            Json.asString(Json.require(m, "notes"), "notes"));
    }

    public static ValidValuesTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ValidValuesTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ValidValuesTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ValidValuesTyped> fromJSONList(String json) {
        List<ValidValuesTyped> result = new ArrayList<ValidValuesTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ValidValuesTyped")));
        return result;
    }
}
