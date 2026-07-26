package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.json.JSONObject;
import org.json.JSONArray;
import production.*;
import records.*;
import calculator.*;

public class EnumerationValuesTyped {
    public String value;
    public String notes;

    public EnumerationValuesTyped(String value, String notes) {
        this.value = value;
        this.notes = notes;
    }

    public EnumerationValuesTyped(EnumerationValuesString s) {
        this.value = s.value;
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EnumerationValuesTyped)) return false;
        EnumerationValuesTyped that = (EnumerationValuesTyped) o;
        return Objects.equals(value, that.value)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value, notes);
    }

    public EnumerationValuesString toEnumerationValuesString() {
        return new EnumerationValuesString(String.valueOf(value), String.valueOf(notes));
    }

    public static List<EnumerationValuesTyped> fromStringList(List<EnumerationValuesString> list) {
        List<EnumerationValuesTyped> result = new ArrayList<>();
        for (EnumerationValuesString s : list) result.add(new EnumerationValuesTyped(s));
        return result;
    }

    public static List<EnumerationValuesString> toStringList(List<EnumerationValuesTyped> list) {
        List<EnumerationValuesString> result = new ArrayList<>();
        for (EnumerationValuesTyped t : list) result.add(t.toEnumerationValuesString());
        return result;
    }

    public JSONObject toJSON() {
        JSONObject obj = new JSONObject();
        obj.put("value", value);
        obj.put("notes", notes);
        return obj;
    }

    public static EnumerationValuesTyped fromJSON(JSONObject obj) {
        return new EnumerationValuesTyped(
            obj.getString("value"),
            obj.getString("notes"));
    }

    public static JSONArray toJSONList(List<EnumerationValuesTyped> list) {
        JSONArray arr = new JSONArray();
        for (EnumerationValuesTyped item : list) arr.put(item.toJSON());
        return arr;
    }

    public static List<EnumerationValuesTyped> fromJSONList(JSONArray arr) {
        List<EnumerationValuesTyped> result = new ArrayList<>();
        for (int i = 0; i < arr.length(); i++) result.add(fromJSON(arr.getJSONObject(i)));
        return result;
    }
}
