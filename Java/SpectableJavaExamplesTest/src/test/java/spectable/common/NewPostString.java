package spectable.common;

import java.util.Objects;
import production.*;
import records.*;
import calculator.*;

public class NewPostString {
    private static final String DNCString = "?DNC?";

    public String title;
    public String body;
    public String userId;

    public NewPostString(String title, String body, String userId) {
        this.title = title;
        this.body = body;
        this.userId = userId;
    }

    /** Builds from the text form, e.g. Money as "25 USD". */
    public static NewPostString fromText(String text) {
        java.util.List<String> parts = Tokens.require(text, 3, "NewPost");
        return new NewPostString(parts.get(0), parts.get(1), parts.get(2));
    }

    public NewPostString(String text) {
        NewPostString parsed = fromText(text);
        this.title = parsed.title;
        this.body = parsed.body;
        this.userId = parsed.userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NewPostString)) return false;
        NewPostString that = (NewPostString) o;
        return (DNCString.equals(title) || DNCString.equals(that.title) || Objects.equals(title, that.title))
            && (DNCString.equals(body) || DNCString.equals(that.body) || Objects.equals(body, that.body))
            && (DNCString.equals(userId) || DNCString.equals(that.userId) || Objects.equals(userId, that.userId));
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, body, userId);
    }

    @Override
    public String toString() {
        return Tokens.token(title) + " " + Tokens.token(body) + " " + Tokens.token(userId);
    }
}
