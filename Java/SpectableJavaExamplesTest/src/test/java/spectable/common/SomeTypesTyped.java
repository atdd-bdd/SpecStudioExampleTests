package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.json.JSONObject;
import org.json.JSONArray;
import production.*;
import records.*;
import calculator.*;

public class SomeTypesTyped {
    public int anInt;
    public double aDouble;
    public char aChar;
    public char achar1;

    public SomeTypesTyped(int anInt, double aDouble, char aChar, char achar1) {
        this.anInt = anInt;
        this.aDouble = aDouble;
        this.aChar = aChar;
        this.achar1 = achar1;
    }

    public SomeTypesTyped(SomeTypesString s) {
        this.anInt = Integer.parseInt(s.anInt);
        this.aDouble = Double.parseDouble(s.aDouble);
        this.aChar = s.aChar.isEmpty() ? '\0' : s.aChar.charAt(0);
        this.achar1 = s.achar1.isEmpty() ? '\0' : s.achar1.charAt(0);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SomeTypesTyped)) return false;
        SomeTypesTyped that = (SomeTypesTyped) o;
        return Objects.equals(anInt, that.anInt)
            && Objects.equals(aDouble, that.aDouble)
            && Objects.equals(aChar, that.aChar)
            && Objects.equals(achar1, that.achar1);
    }

    @Override
    public int hashCode() {
        return Objects.hash(anInt, aDouble, aChar, achar1);
    }

    public SomeTypesString toSomeTypesString() {
        return new SomeTypesString(String.valueOf(anInt), String.valueOf(aDouble), String.valueOf(aChar), String.valueOf(achar1));
    }

    public static List<SomeTypesTyped> fromStringList(List<SomeTypesString> list) {
        List<SomeTypesTyped> result = new ArrayList<>();
        for (SomeTypesString s : list) result.add(new SomeTypesTyped(s));
        return result;
    }

    public static List<SomeTypesString> toStringList(List<SomeTypesTyped> list) {
        List<SomeTypesString> result = new ArrayList<>();
        for (SomeTypesTyped t : list) result.add(t.toSomeTypesString());
        return result;
    }

    public JSONObject toJSON() {
        JSONObject obj = new JSONObject();
        obj.put("anInt", anInt);
        obj.put("aDouble", aDouble);
        obj.put("aChar", String.valueOf(aChar));
        obj.put("achar1", String.valueOf(achar1));
        return obj;
    }

    public static SomeTypesTyped fromJSON(JSONObject obj) {
        return new SomeTypesTyped(
            obj.getInt("anInt"),
            obj.getDouble("aDouble"),
            (char) obj.getString("aChar").charAt(0),
            (char) obj.getString("achar1").charAt(0));
    }

    public static JSONArray toJSONList(List<SomeTypesTyped> list) {
        JSONArray arr = new JSONArray();
        for (SomeTypesTyped item : list) arr.put(item.toJSON());
        return arr;
    }

    public static List<SomeTypesTyped> fromJSONList(JSONArray arr) {
        List<SomeTypesTyped> result = new ArrayList<>();
        for (int i = 0; i < arr.length(); i++) result.add(fromJSON(arr.getJSONObject(i)));
        return result;
    }
}
