package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ReplacePostTyped {
    public int id;
    public int userId;
    public String title;
    public String body;

    public ReplacePostTyped(int id, int userId, String title, String body) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

    public ReplacePostTyped(ReplacePostString s) {
        this.id = Integer.parseInt(s.id);
        this.userId = Integer.parseInt(s.userId);
        this.title = s.title;
        this.body = s.body;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReplacePostTyped)) return false;
        ReplacePostTyped that = (ReplacePostTyped) o;
        return Objects.equals(id, that.id)
            && Objects.equals(userId, that.userId)
            && Objects.equals(title, that.title)
            && Objects.equals(body, that.body);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, title, body);
    }

    public ReplacePostString toReplacePostString() {
        return new ReplacePostString(String.valueOf(id), String.valueOf(userId), String.valueOf(title), String.valueOf(body));
    }

    public static List<ReplacePostTyped> fromStringList(List<ReplacePostString> list) {
        List<ReplacePostTyped> result = new ArrayList<>();
        for (ReplacePostString s : list) result.add(new ReplacePostTyped(s));
        return result;
    }

    public static List<ReplacePostString> toStringList(List<ReplacePostTyped> list) {
        List<ReplacePostString> result = new ArrayList<>();
        for (ReplacePostTyped t : list) result.add(t.toReplacePostString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("id", id);
        m.put("userId", userId);
        m.put("title", title);
        m.put("body", body);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static ReplacePostTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new ReplacePostTyped(
            Json.asInt(Json.require(m, "id"), "id"),
            Json.asInt(Json.require(m, "userId"), "userId"),
            Json.asString(Json.require(m, "title"), "title"),
            Json.asString(Json.require(m, "body"), "body"));
    }

    public static ReplacePostTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<ReplacePostTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (ReplacePostTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<ReplacePostTyped> fromJSONList(String json) {
        List<ReplacePostTyped> result = new ArrayList<ReplacePostTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "ReplacePostTyped")));
        return result;
    }
}
