package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class PatchTitleTyped {
    public String title;

    public PatchTitleTyped(String title) {
        this.title = title;
    }

    public PatchTitleTyped(PatchTitleString s) {
        this.title = s.title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PatchTitleTyped)) return false;
        PatchTitleTyped that = (PatchTitleTyped) o;
        return Objects.equals(title, that.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title);
    }

    public PatchTitleString toPatchTitleString() {
        return new PatchTitleString(String.valueOf(title));
    }

    public static List<PatchTitleTyped> fromStringList(List<PatchTitleString> list) {
        List<PatchTitleTyped> result = new ArrayList<>();
        for (PatchTitleString s : list) result.add(new PatchTitleTyped(s));
        return result;
    }

    public static List<PatchTitleString> toStringList(List<PatchTitleTyped> list) {
        List<PatchTitleString> result = new ArrayList<>();
        for (PatchTitleTyped t : list) result.add(t.toPatchTitleString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("title", title);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static PatchTitleTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new PatchTitleTyped(
            Json.asString(Json.require(m, "title"), "title"));
    }

    public static PatchTitleTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<PatchTitleTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (PatchTitleTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<PatchTitleTyped> fromJSONList(String json) {
        List<PatchTitleTyped> result = new ArrayList<PatchTitleTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "PatchTitleTyped")));
        return result;
    }
}
