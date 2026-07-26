package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class FandCTyped {
    public int f;
    public int c;
    public String notes;

    public FandCTyped(int f, int c, String notes) {
        this.f = f;
        this.c = c;
        this.notes = notes;
    }

    public FandCTyped(FandCString s) {
        this.f = Integer.parseInt(s.f);
        this.c = Integer.parseInt(s.c);
        this.notes = s.notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FandCTyped)) return false;
        FandCTyped that = (FandCTyped) o;
        return Objects.equals(f, that.f)
            && Objects.equals(c, that.c)
            && Objects.equals(notes, that.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(f, c, notes);
    }

    public FandCString toFandCString() {
        return new FandCString(String.valueOf(f), String.valueOf(c), String.valueOf(notes));
    }

    public static List<FandCTyped> fromStringList(List<FandCString> list) {
        List<FandCTyped> result = new ArrayList<>();
        for (FandCString s : list) result.add(new FandCTyped(s));
        return result;
    }

    public static List<FandCString> toStringList(List<FandCTyped> list) {
        List<FandCString> result = new ArrayList<>();
        for (FandCTyped t : list) result.add(t.toFandCString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("f", f);
        m.put("c", c);
        m.put("notes", notes);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static FandCTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new FandCTyped(
            Json.asInt(Json.require(m, "f"), "f"),
            Json.asInt(Json.require(m, "c"), "c"),
            Json.asString(Json.require(m, "notes"), "notes"));
    }

    public static FandCTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<FandCTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (FandCTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<FandCTyped> fromJSONList(String json) {
        List<FandCTyped> result = new ArrayList<FandCTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "FandCTyped")));
        return result;
    }
}
