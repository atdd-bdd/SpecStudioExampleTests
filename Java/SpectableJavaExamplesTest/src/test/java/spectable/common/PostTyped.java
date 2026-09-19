package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class PostTyped {
    public int userId;
    public int id;
    public String title;
    public String body;

    public PostTyped(int userId, int id, String title, String body) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
    }

    public PostTyped(PostString s) {
        this.userId = Integer.parseInt(s.userId);
        this.id = Integer.parseInt(s.id);
        this.title = s.title;
        this.body = s.body;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PostTyped)) return false;
        PostTyped that = (PostTyped) o;
        return Objects.equals(userId, that.userId)
            && Objects.equals(id, that.id)
            && Objects.equals(title, that.title)
            && Objects.equals(body, that.body);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, id, title, body);
    }

    public PostString toPostString() {
        return new PostString(String.valueOf(userId), String.valueOf(id), String.valueOf(title), String.valueOf(body));
    }

    public static List<PostTyped> fromStringList(List<PostString> list) {
        List<PostTyped> result = new ArrayList<>();
        for (PostString s : list) result.add(new PostTyped(s));
        return result;
    }

    public static List<PostString> toStringList(List<PostTyped> list) {
        List<PostString> result = new ArrayList<>();
        for (PostTyped t : list) result.add(t.toPostString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("userId", userId);
        m.put("id", id);
        m.put("title", title);
        m.put("body", body);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static PostTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new PostTyped(
            Json.asInt(Json.require(m, "userId"), "userId"),
            Json.asInt(Json.require(m, "id"), "id"),
            Json.asString(Json.require(m, "title"), "title"),
            Json.asString(Json.require(m, "body"), "body"));
    }

    public static PostTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<PostTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (PostTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<PostTyped> fromJSONList(String json) {
        List<PostTyped> result = new ArrayList<PostTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "PostTyped")));
        return result;
    }
}
