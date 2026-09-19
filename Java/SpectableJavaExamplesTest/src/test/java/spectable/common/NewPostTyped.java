package spectable.common;

import java.util.ArrayList;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class NewPostTyped {
    public String title;
    public String body;
    public int userId;

    public NewPostTyped(String title, String body, int userId) {
        this.title = title;
        this.body = body;
        this.userId = userId;
    }

    public NewPostTyped(NewPostString s) {
        this.title = s.title;
        this.body = s.body;
        this.userId = Integer.parseInt(s.userId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NewPostTyped)) return false;
        NewPostTyped that = (NewPostTyped) o;
        return Objects.equals(title, that.title)
            && Objects.equals(body, that.body)
            && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, body, userId);
    }

    public NewPostString toNewPostString() {
        return new NewPostString(String.valueOf(title), String.valueOf(body), String.valueOf(userId));
    }

    public static List<NewPostTyped> fromStringList(List<NewPostString> list) {
        List<NewPostTyped> result = new ArrayList<>();
        for (NewPostString s : list) result.add(new NewPostTyped(s));
        return result;
    }

    public static List<NewPostString> toStringList(List<NewPostTyped> list) {
        List<NewPostString> result = new ArrayList<>();
        for (NewPostTyped t : list) result.add(t.toNewPostString());
        return result;
    }

    /** Internal plumbing for {@link Json}; use toJSON() for JSON text. */
    public Map<String, Object> toJsonValue() {
        Map<String, Object> m = new LinkedHashMap<String, Object>();
        m.put("title", title);
        m.put("body", body);
        m.put("userId", userId);
        return m;
    }

    public String toJSON() { return Json.write(toJsonValue()); }

    /** Internal plumbing for {@link Json}; use fromJSON(String) for JSON text. */
    public static NewPostTyped fromJsonValue(Map<String, Object> m) {
        if (m == null) return null;
        return new NewPostTyped(
            Json.asString(Json.require(m, "title"), "title"),
            Json.asString(Json.require(m, "body"), "body"),
            Json.asInt(Json.require(m, "userId"), "userId"));
    }

    public static NewPostTyped fromJSON(String json) {
        return fromJsonValue(Json.parseObject(json));
    }

    public static String toJSONList(List<NewPostTyped> list) {
        List<Object> arr = new ArrayList<Object>();
        if (list != null)
            for (NewPostTyped item : list) arr.add(item == null ? null : item.toJsonValue());
        return Json.write(arr);
    }

    public static List<NewPostTyped> fromJSONList(String json) {
        List<NewPostTyped> result = new ArrayList<NewPostTyped>();
        for (Object e : Json.parseArray(json))
            result.add(fromJsonValue(Json.asObject(e, "NewPostTyped")));
        return result;
    }
}
