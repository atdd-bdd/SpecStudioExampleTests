package spectable.common;

import java.util.ArrayList;
import java.util.List;
import production.*;
import records.*;
import calculator.*;

/**
 * The text form of an Entity: its attribute values as space separated tokens,
 * in the order the attributes are declared.
 *
 *   Money        Amount, Currency        25 USD
 *   Address      with a spaced value     \"1 Penny Lane\" Liverpool NY
 *   Holding      with a nested Money     IBM 1000 '25 USD'
 *
 * A value containing a space is wrapped in double quotes; a nested Entity's own
 * text form is wrapped in single quotes. A run of spaces separates one token
 * from the next exactly as a single space does.
 */
public final class Tokens {

    private Tokens() {}

    /** Splits a text form into one string per attribute. */
    public static List<String> split(String text) {
        List<String> out = new ArrayList<>();
        if (text == null) return out;
        final int n = text.length();
        int i = 0;
        while (i < n) {
            while (i < n && Character.isWhitespace(text.charAt(i))) i++;
            if (i >= n) break;
            final char c = text.charAt(i);
            if (c == '"' || c == '\'') {
                final int close = closingQuote(text, i, c);
                out.add(text.substring(i + 1, close));
                i = close + 1;
            } else {
                int j = i;
                while (j < n && !Character.isWhitespace(text.charAt(j))) j++;
                out.add(text.substring(i, j));
                i = j;
            }
        }
        return out;
    }

    // The closing quote is the next one of the same kind that ends the token --
    // that is, one followed by whitespace or by the end of the text. Scanning for
    // that rather than for the first quote is what lets a nested Entity, itself
    // single quoted, sit inside a single quoted value.
    private static int closingQuote(String text, int open, char quote) {
        for (int j = open + 1; j < text.length(); j++) {
            if (text.charAt(j) != quote) continue;
            if (j + 1 == text.length() || Character.isWhitespace(text.charAt(j + 1)))
                return j;
        }
        throw new IllegalArgumentException(
                "No closing " + quote + " in: " + text);
    }

    /** Renders one plain value, quoting it only when it has to be. */
    public static String token(String value) {
        if (value == null || value.isEmpty()) return "\"\"";
        for (int i = 0; i < value.length(); i++)
            if (Character.isWhitespace(value.charAt(i))) return "\"" + value + "\"";
        return value;
    }

    /** Renders a nested Entity's text form. */
    public static String nested(String text) {
        return "'" + (text == null ? "" : text) + "'";
    }

    /** Checks the count before a text form is unpacked into attributes. */
    public static List<String> require(String text, int expected, String typeName) {
        List<String> parts = split(text);
        if (parts.size() != expected)
            throw new IllegalArgumentException(typeName + " takes " + expected
                    + " values but got " + parts.size() + ": " + text);
        return parts;
    }
}
