package spectable.common;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import production.*;
import records.*;
import calculator.*;

/** Minimal dependency-free JSON reader/writer used by the generated Typed classes. */
public final class Json {

    private Json() {}

    // -----------------------------------------------------------------
    // Writing
    // -----------------------------------------------------------------

    /** Serialize a value graph (null, String, Boolean, Number, Map, Iterable) to JSON text. */
    public static String write(Object value) {
        StringBuilder sb = new StringBuilder();
        writeValue(sb, value);
        return sb.toString();
    }

    private static void writeValue(StringBuilder sb, Object v) {
        if (v == null)               { sb.append("null"); return; }
        if (v instanceof String)     { writeString(sb, (String) v); return; }
        if (v instanceof Character)  { writeString(sb, String.valueOf(v)); return; }
        if (v instanceof Boolean)    { sb.append(((Boolean) v).booleanValue() ? "true" : "false"); return; }
        if (v instanceof BigDecimal) { sb.append(((BigDecimal) v).toPlainString()); return; }
        if (v instanceof Double || v instanceof Float) {
            double d = ((Number) v).doubleValue();
            if (Double.isNaN(d) || Double.isInfinite(d))
                throw new IllegalArgumentException("Cannot write non-finite number to JSON: " + d);
            sb.append(Double.toString(d));
            return;
        }
        if (v instanceof Number) { sb.append(v.toString()); return; }
        if (v instanceof Map) {
            sb.append('{');
            boolean first = true;
            for (Map.Entry<?, ?> e : ((Map<?, ?>) v).entrySet()) {
                if (!first) sb.append(',');
                first = false;
                writeString(sb, String.valueOf(e.getKey()));
                sb.append(':');
                writeValue(sb, e.getValue());
            }
            sb.append('}');
            return;
        }
        if (v instanceof Iterable) {
            sb.append('[');
            boolean first = true;
            for (Object o : (Iterable<?>) v) {
                if (!first) sb.append(',');
                first = false;
                writeValue(sb, o);
            }
            sb.append(']');
            return;
        }
        writeString(sb, v.toString());
    }

    private static void writeString(StringBuilder sb, String s) {
        sb.append('"');
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '"':  sb.append("\\\""); break;
                case '\\': sb.append("\\\\"); break;
                case '\b': sb.append("\\b");  break;
                case '\f': sb.append("\\f");  break;
                case '\n': sb.append("\\n");  break;
                case '\r': sb.append("\\r");  break;
                case '\t': sb.append("\\t");  break;
                default:
                    if (c < 0x20) sb.append(String.format("\\u%04x", (int) c));
                    else          sb.append(c);
            }
        }
        sb.append('"');
    }

    // -----------------------------------------------------------------
    // Reading
    // -----------------------------------------------------------------

    /** Parse JSON text into Map / List / String / BigDecimal / Boolean / null. */
    public static Object parse(String text) {
        if (text == null) throw new IllegalArgumentException("JSON text is null");
        Parser p = new Parser(text);
        Object v = p.readValue();
        p.skipWhitespace();
        if (!p.atEnd()) throw new IllegalArgumentException("Trailing content at offset " + p.pos());
        return v;
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Object> parseObject(String text) {
        Object v = parse(text);
        if (!(v instanceof Map)) throw new IllegalArgumentException("Expected a JSON object");
        return (Map<String, Object>) v;
    }

    @SuppressWarnings("unchecked")
    public static List<Object> parseArray(String text) {
        Object v = parse(text);
        if (!(v instanceof List)) throw new IllegalArgumentException("Expected a JSON array");
        return (List<Object>) v;
    }

    private static final class Parser {
        private final String src;
        private int i = 0;

        Parser(String src) { this.src = src; }

        int pos()        { return i; }
        boolean atEnd()  { return i >= src.length(); }

        void skipWhitespace() {
            while (i < src.length()) {
                char c = src.charAt(i);
                if (c == ' ' || c == '\t' || c == '\n' || c == '\r') i++;
                else break;
            }
        }

        Object readValue() {
            skipWhitespace();
            if (atEnd()) throw err("Unexpected end of JSON input");
            char c = src.charAt(i);
            switch (c) {
                case '{': return readObject();
                case '[': return readArray();
                case '"': return readString();
                case 't': expect("true");  return Boolean.TRUE;
                case 'f': expect("false"); return Boolean.FALSE;
                case 'n': expect("null");  return null;
                default:  return readNumber();
            }
        }

        Map<String, Object> readObject() {
            Map<String, Object> m = new LinkedHashMap<String, Object>();
            i++; // consume '{'
            skipWhitespace();
            if (!atEnd() && src.charAt(i) == '}') { i++; return m; }
            while (true) {
                skipWhitespace();
                if (atEnd() || src.charAt(i) != '"') throw err("Expected a string key");
                String key = readString();
                skipWhitespace();
                if (atEnd() || src.charAt(i) != ':') throw err("Expected ':' after key '" + key + "'");
                i++;
                m.put(key, readValue());
                skipWhitespace();
                if (atEnd()) throw err("Unterminated object");
                char d = src.charAt(i);
                if (d == ',') { i++; continue; }
                if (d == '}') { i++; return m; }
                throw err("Expected ',' or '}'");
            }
        }

        List<Object> readArray() {
            List<Object> list = new ArrayList<Object>();
            i++; // consume '['
            skipWhitespace();
            if (!atEnd() && src.charAt(i) == ']') { i++; return list; }
            while (true) {
                list.add(readValue());
                skipWhitespace();
                if (atEnd()) throw err("Unterminated array");
                char d = src.charAt(i);
                if (d == ',') { i++; continue; }
                if (d == ']') { i++; return list; }
                throw err("Expected ',' or ']'");
            }
        }

        String readString() {
            i++; // consume opening quote
            StringBuilder sb = new StringBuilder();
            while (true) {
                if (atEnd()) throw err("Unterminated string");
                char c = src.charAt(i++);
                if (c == '"')  return sb.toString();
                if (c != '\\') { sb.append(c); continue; }
                if (atEnd()) throw err("Unterminated escape");
                char e = src.charAt(i++);
                switch (e) {
                    case '"':  sb.append('"');  break;
                    case '\\': sb.append('\\'); break;
                    case '/':  sb.append('/');  break;
                    case 'b':  sb.append('\b'); break;
                    case 'f':  sb.append('\f'); break;
                    case 'n':  sb.append('\n'); break;
                    case 'r':  sb.append('\r'); break;
                    case 't':  sb.append('\t'); break;
                    case 'u':
                        if (i + 4 > src.length()) throw err("Truncated \\u escape");
                        sb.append((char) Integer.parseInt(src.substring(i, i + 4), 16));
                        i += 4;
                        break;
                    default: throw err("Invalid escape '\\" + e + "'");
                }
            }
        }

        BigDecimal readNumber() {
            int start = i;
            if (!atEnd() && src.charAt(i) == '-') i++;
            while (!atEnd()) {
                char c = src.charAt(i);
                if ((c >= '0' && c <= '9') || c == '.' || c == 'e' || c == 'E'
                 || c == '+' || c == '-') i++;
                else break;
            }
            if (start == i) throw err("Expected a value");
            String text = src.substring(start, i);
            try {
                return new BigDecimal(text);
            } catch (NumberFormatException ex) {
                throw err("Invalid number '" + text + "'");
            }
        }

        void expect(String word) {
            if (!src.startsWith(word, i)) throw err("Expected '" + word + "'");
            i += word.length();
        }

        IllegalArgumentException err(String msg) {
            return new IllegalArgumentException(msg + " at offset " + i);
        }
    }

    // -----------------------------------------------------------------
    // Field accessors — a missing key or a wrong type raises
    // IllegalArgumentException.  An explicit JSON null is passed through
    // as null (for reference types) rather than treated as an error.
    // -----------------------------------------------------------------

    public static Object require(Map<String, Object> obj, String key) {
        if (obj == null)              throw new IllegalArgumentException("Missing JSON object for field '" + key + "'");
        if (!obj.containsKey(key))    throw new IllegalArgumentException("Missing JSON field '" + key + "'");
        return obj.get(key);
    }

    public static String              getString (Map<String, Object> o, String k) { return asString (require(o, k), k); }
    public static int                 getInt    (Map<String, Object> o, String k) { return asInt    (require(o, k), k); }
    public static long                getLong   (Map<String, Object> o, String k) { return asLong   (require(o, k), k); }
    public static double              getDouble (Map<String, Object> o, String k) { return asDouble (require(o, k), k); }
    public static BigDecimal          getDecimal(Map<String, Object> o, String k) { return asDecimal(require(o, k), k); }
    public static boolean             getBoolean(Map<String, Object> o, String k) { return asBoolean(require(o, k), k); }
    public static char                getChar   (Map<String, Object> o, String k) { return asChar   (require(o, k), k); }
    public static Map<String, Object> getObject (Map<String, Object> o, String k) { return asObject (require(o, k), k); }
    public static List<Object>        getArray  (Map<String, Object> o, String k) { return asArray  (require(o, k), k); }

    public static String asString(Object v, String ctx) {
        if (v == null)               return null;
        if (v instanceof String)     return (String) v;
        if (v instanceof BigDecimal) return ((BigDecimal) v).toPlainString();
        if (v instanceof Boolean)    return v.toString();
        throw typeError(ctx, "a string", v);
    }

    public static BigDecimal asDecimal(Object v, String ctx) {
        if (v instanceof BigDecimal) return (BigDecimal) v;
        if (v instanceof Number)     return new BigDecimal(v.toString());
        if (v instanceof String) {
            try { return new BigDecimal(((String) v).trim()); }
            catch (NumberFormatException ex) { throw typeError(ctx, "a number", v); }
        }
        throw typeError(ctx, "a number", v);
    }

    public static int asInt(Object v, String ctx) {
        try { return asDecimal(v, ctx).stripTrailingZeros().intValueExact(); }
        catch (ArithmeticException ex) { throw typeError(ctx, "an integer", v); }
    }

    public static long asLong(Object v, String ctx) {
        try { return asDecimal(v, ctx).stripTrailingZeros().longValueExact(); }
        catch (ArithmeticException ex) { throw typeError(ctx, "a long", v); }
    }

    public static double asDouble(Object v, String ctx) {
        return asDecimal(v, ctx).doubleValue();
    }

    public static boolean asBoolean(Object v, String ctx) {
        if (v instanceof Boolean) return ((Boolean) v).booleanValue();
        if (v instanceof String) {
            String s = ((String) v).trim();
            if (s.equalsIgnoreCase("true")  || s.equalsIgnoreCase("t")
             || s.equalsIgnoreCase("yes")   || s.equalsIgnoreCase("y")  || s.equals("1")) return true;
            if (s.equalsIgnoreCase("false") || s.equalsIgnoreCase("f")
             || s.equalsIgnoreCase("no")    || s.equalsIgnoreCase("n")  || s.equals("0")) return false;
        }
        throw typeError(ctx, "a boolean", v);
    }

    public static char asChar(Object v, String ctx) {
        String s = asString(v, ctx);
        return (s == null || s.isEmpty()) ? '\0' : s.charAt(0);
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Object> asObject(Object v, String ctx) {
        if (v == null)        return null;
        if (v instanceof Map) return (Map<String, Object>) v;
        throw typeError(ctx, "an object", v);
    }

    @SuppressWarnings("unchecked")
    public static List<Object> asArray(Object v, String ctx) {
        if (v == null)         return null;
        if (v instanceof List) return (List<Object>) v;
        throw typeError(ctx, "an array", v);
    }

    private static IllegalArgumentException typeError(String ctx, String expected, Object actual) {
        return new IllegalArgumentException(
            "JSON field '" + ctx + "' is not " + expected + " (got " + describe(actual) + ")");
    }

    private static String describe(Object v) {
        if (v == null)               return "null";
        if (v instanceof String)     return "a string";
        if (v instanceof Boolean)    return "a boolean";
        if (v instanceof BigDecimal) return "a number";
        if (v instanceof Map)        return "an object";
        if (v instanceof List)       return "an array";
        return v.getClass().getSimpleName();
    }
}
