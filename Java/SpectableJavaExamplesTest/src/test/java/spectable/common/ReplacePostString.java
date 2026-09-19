package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class ReplacePostString {
    private static final String DNCString = "?DNC?";

    public String id;
    public String userId;
    public String title;
    public String body;

    public ReplacePostString(String id, String userId, String title, String body) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static ReplacePostString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 4, "ReplacePost");
        return new ReplacePostString(parts.get(0), parts.get(1), parts.get(2), parts.get(3));
    }

    public ReplacePostString(String text) {
        ReplacePostString parsed = fromText(text);
        this.id = parsed.id;
        this.userId = parsed.userId;
        this.title = parsed.title;
        this.body = parsed.body;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReplacePostString)) return false;
        ReplacePostString that = (ReplacePostString) o;
        return (DNCString.equals(id) || DNCString.equals(that.id) || Objects.equals(id, that.id))
            && (DNCString.equals(userId) || DNCString.equals(that.userId) || Objects.equals(userId, that.userId))
            && (DNCString.equals(title) || DNCString.equals(that.title) || Objects.equals(title, that.title))
            && (DNCString.equals(body) || DNCString.equals(that.body) || Objects.equals(body, that.body));
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, title, body);
    }

    @Override
    public String toString() {
        return Tokens.token(id) + " " + Tokens.token(userId) + " " + Tokens.token(title) + " " + Tokens.token(body);
    }
}
