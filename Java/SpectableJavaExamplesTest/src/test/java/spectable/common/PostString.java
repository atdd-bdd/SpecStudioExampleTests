package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class PostString {
    private static final String DNCString = "?DNC?";

    public String userId;
    public String id;
    public String title;
    public String body;

    public PostString(String userId, String id, String title, String body) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static PostString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 4, "Post");
        return new PostString(parts.get(0), parts.get(1), parts.get(2), parts.get(3));
    }

    public PostString(String text) {
        PostString parsed = fromText(text);
        this.userId = parsed.userId;
        this.id = parsed.id;
        this.title = parsed.title;
        this.body = parsed.body;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PostString)) return false;
        PostString that = (PostString) o;
        return (DNCString.equals(userId) || DNCString.equals(that.userId) || Objects.equals(userId, that.userId))
            && (DNCString.equals(id) || DNCString.equals(that.id) || Objects.equals(id, that.id))
            && (DNCString.equals(title) || DNCString.equals(that.title) || Objects.equals(title, that.title))
            && (DNCString.equals(body) || DNCString.equals(that.body) || Objects.equals(body, that.body));
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, id, title, body);
    }

    @Override
    public String toString() {
        return Tokens.token(userId) + " " + Tokens.token(id) + " " + Tokens.token(title) + " " + Tokens.token(body);
    }
}
