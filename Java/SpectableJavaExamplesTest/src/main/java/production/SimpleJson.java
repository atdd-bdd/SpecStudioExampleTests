package production;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * The compact JSON-like text used by the Json specification: names are not
 * quoted, values are, and whitespace between tokens is insignificant.
 *
 *     {anInt:"1",aString:"B"}
 *     [{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]
 *
 * Field order is preserved, so a canonical form can be compared directly.
 */
public class SimpleJson {

    // -----------------------------------------------------------------
    // Writing
    // -----------------------------------------------------------------

    public static String toObject(Map<String, String> fields) {
        StringBuilder sb = new StringBuilder("{");
        boolean first = true;
        for (Map.Entry<String, String> field : fields.entrySet()) {
            if (!first) sb.append(',');
            first = false;
            sb.append(field.getKey()).append(':');
            appendQuoted(sb, field.getValue());
        }
        return sb.append('}').toString();
    }

    public static String toArray(List<? extends Map<String, String>> rows) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < rows.size(); i++) {
            if (i > 0) sb.append(',');
            sb.append(toObject(rows.get(i)));
        }
        return sb.append(']').toString();
    }

    private static void appendQuoted(StringBuilder sb, String value) {
        sb.append('"');
        if (value != null) {
            for (int i = 0; i < value.length(); i++) {
                char c = value.charAt(i);
                if (c == '"' || c == '\\') sb.append('\\');
                sb.append(c);
            }
        }
        sb.append('"');
    }

    // -----------------------------------------------------------------
    // Reading
    // -----------------------------------------------------------------

    public static LinkedHashMap<String, String> parseObject(String text) {
        Cursor c = new Cursor(text);
        LinkedHashMap<String, String> fields = readObject(c);
        c.skipWhitespace();
        if (!c.atEnd()) throw new IllegalArgumentException("Unexpected text after object at " + c.pos());
        return fields;
    }

    public static List<LinkedHashMap<String, String>> parseArray(String text) {
        Cursor c = new Cursor(text);
        c.skipWhitespace();
        c.expect('[');
        List<LinkedHashMap<String, String>> rows = new ArrayList<>();
        c.skipWhitespace();
        if (c.peek() == ']') {
            c.next();
        } else {
            while (true) {
                rows.add(readObject(c));
                c.skipWhitespace();
                char d = c.next();
                if (d == ',') continue;
                if (d == ']') break;
                throw new IllegalArgumentException("Expected ',' or ']' at " + c.pos());
            }
        }
        c.skipWhitespace();
        if (!c.atEnd()) throw new IllegalArgumentException("Unexpected text after array at " + c.pos());
        return rows;
    }

    /**
     * Remove whitespace that sits between tokens, leaving a plain string that
     * can be compared to another one directly. Whitespace inside a quoted
     * value is part of the value and is kept.
     */
    public static String withoutWhitespace(String text) {
        if (text == null) return "";
        StringBuilder sb = new StringBuilder(text.length());
        boolean inQuotes = false;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (inQuotes) {
                sb.append(c);
                if (c == '\\' && i + 1 < text.length()) {
                    sb.append(text.charAt(i + 1));
                    i++;
                } else if (c == '"') {
                    inQuotes = false;
                }
            } else if (c == '"') {
                inQuotes = true;
                sb.append(c);
            } else if (!Character.isWhitespace(c)) {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    private static LinkedHashMap<String, String> readObject(Cursor c) {
        c.skipWhitespace();
        c.expect('{');
        LinkedHashMap<String, String> fields = new LinkedHashMap<>();
        c.skipWhitespace();
        if (c.peek() == '}') { c.next(); return fields; }

        while (true) {
            c.skipWhitespace();
            String name = readName(c);
            c.skipWhitespace();
            c.expect(':');
            c.skipWhitespace();
            fields.put(name, readValue(c));
            c.skipWhitespace();
            char d = c.next();
            if (d == ',') continue;
            if (d == '}') return fields;
            throw new IllegalArgumentException("Expected ',' or '}' at " + c.pos());
        }
    }

    /** A name is bare text up to the colon, or a quoted string. */
    private static String readName(Cursor c) {
        if (c.peek() == '"') return readQuoted(c);
        StringBuilder sb = new StringBuilder();
        while (!c.atEnd() && c.peek() != ':') sb.append(c.next());
        return sb.toString().trim();
    }

    /** A value is a quoted string, or bare text up to the next ',' or '}'. */
    private static String readValue(Cursor c) {
        if (c.peek() == '"') return readQuoted(c);
        StringBuilder sb = new StringBuilder();
        while (!c.atEnd() && c.peek() != ',' && c.peek() != '}') sb.append(c.next());
        return sb.toString().trim();
    }

    private static String readQuoted(Cursor c) {
        c.expect('"');
        StringBuilder sb = new StringBuilder();
        while (true) {
            if (c.atEnd()) throw new IllegalArgumentException("Unterminated string at " + c.pos());
            char ch = c.next();
            if (ch == '"') return sb.toString();
            if (ch == '\\' && !c.atEnd()) ch = c.next();
            sb.append(ch);
        }
    }

    private static final class Cursor {
        private final String text;
        private int i = 0;

        Cursor(String text) { this.text = text == null ? "" : text; }

        int pos()       { return i; }
        boolean atEnd() { return i >= text.length(); }
        char peek()     { return atEnd() ? '\0' : text.charAt(i); }
        char next()     { return atEnd() ? '\0' : text.charAt(i++); }

        void skipWhitespace() {
            while (!atEnd() && Character.isWhitespace(text.charAt(i))) i++;
        }

        void expect(char expected) {
            skipWhitespace();
            if (next() != expected)
                throw new IllegalArgumentException("Expected '" + expected + "' at " + i);
        }
    }
}
