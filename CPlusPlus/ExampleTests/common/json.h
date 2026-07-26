#pragma once
// Minimal dependency-free JSON reader/writer used by the generated Typed structs.
// No third-party library required.

#include <cstdlib>
#include <iomanip>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace json {

class Value;
using Members  = std::vector<std::pair<std::string, Value>>;
using Elements = std::vector<Value>;

/** Thrown for malformed JSON, a missing field, or a value of the wrong type. */
class Error : public std::runtime_error {
public:
    explicit Error(const std::string& msg) : std::runtime_error(msg) {}
};

/** Shortest representation of d that reads back as exactly d. */
inline std::string number_to_string(double d) {
    for (int prec = 15; prec <= 17; ++prec) {
        std::ostringstream ss;
        ss << std::setprecision(prec) << d;
        const std::string s = ss.str();
        if (std::strtod(s.c_str(), nullptr) == d) return s;
    }
    std::ostringstream ss;
    ss << std::setprecision(17) << d;
    return ss.str();
}

class Value {
public:
    enum class Kind { Null, Bool, Number, String, Array, Object };

    Value() = default;

    static Value make_null()                    { return Value(); }
    static Value make_bool(bool b)              { Value v; v.kind_ = Kind::Bool;   v.bool_ = b; return v; }
    static Value make_number_raw(std::string r) { Value v; v.kind_ = Kind::Number; v.text_ = std::move(r); return v; }
    static Value make_number(double d)          { return make_number_raw(number_to_string(d)); }
    static Value make_number(int i)             { return make_number_raw(std::to_string(i)); }
    static Value make_number(long long i)       { return make_number_raw(std::to_string(i)); }
    static Value make_string(std::string s)     { Value v; v.kind_ = Kind::String; v.text_ = std::move(s); return v; }
    static Value make_array(Elements e)         { Value v; v.kind_ = Kind::Array;  v.arr_ = std::make_shared<Elements>(std::move(e)); return v; }
    static Value make_object(Members m)         { Value v; v.kind_ = Kind::Object; v.obj_ = std::make_shared<Members>(std::move(m)); return v; }

    Kind kind()      const { return kind_; }
    bool is_null()   const { return kind_ == Kind::Null; }
    bool is_array()  const { return kind_ == Kind::Array; }
    bool is_object() const { return kind_ == Kind::Object; }

    bool               boolean() const { return bool_; }
    const std::string& text()    const { return text_; }

    const Elements& elements() const {
        static const Elements empty;
        return arr_ ? *arr_ : empty;
    }
    const Members& members() const {
        static const Members empty;
        return obj_ ? *obj_ : empty;
    }

    /** Pointer to the named member, or nullptr when absent. */
    const Value* find(const std::string& key) const {
        if (!obj_) return nullptr;
        for (const auto& kv : *obj_)
            if (kv.first == key) return &kv.second;
        return nullptr;
    }

    std::string describe() const {
        switch (kind_) {
            case Kind::Null:   return "null";
            case Kind::Bool:   return "a boolean";
            case Kind::Number: return "a number";
            case Kind::String: return "a string";
            case Kind::Array:  return "an array";
            case Kind::Object: return "an object";
        }
        return "a value";
    }

private:
    Kind        kind_ = Kind::Null;
    bool        bool_ = false;
    std::string text_;
    std::shared_ptr<Elements> arr_;
    std::shared_ptr<Members>  obj_;
};


// ---------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------

inline void write_string(std::ostringstream& os, const std::string& s) {
    os << '"';
    for (unsigned char c : s) {
        switch (c) {
            case '"':  os << "\\\""; break;
            case '\\': os << "\\\\"; break;
            case '\b': os << "\\b";  break;
            case '\f': os << "\\f";  break;
            case '\n': os << "\\n";  break;
            case '\r': os << "\\r";  break;
            case '\t': os << "\\t";  break;
            default:
                if (c < 0x20) {
                    os << "\\u" << std::hex << std::setw(4) << std::setfill('0')
                       << static_cast<int>(c) << std::dec << std::setfill(' ');
                } else {
                    os << static_cast<char>(c);   // UTF-8 bytes pass through
                }
        }
    }
    os << '"';
}

inline void write_value(std::ostringstream& os, const Value& v) {
    switch (v.kind()) {
        case Value::Kind::Null:   os << "null"; break;
        case Value::Kind::Bool:   os << (v.boolean() ? "true" : "false"); break;
        case Value::Kind::Number: os << v.text(); break;
        case Value::Kind::String: write_string(os, v.text()); break;
        case Value::Kind::Array: {
            os << '[';
            bool first = true;
            for (const Value& e : v.elements()) {
                if (!first) os << ',';
                first = false;
                write_value(os, e);
            }
            os << ']';
            break;
        }
        case Value::Kind::Object: {
            os << '{';
            bool first = true;
            for (const auto& kv : v.members()) {
                if (!first) os << ',';
                first = false;
                write_string(os, kv.first);
                os << ':';
                write_value(os, kv.second);
            }
            os << '}';
            break;
        }
    }
}

inline std::string write(const Value& v) {
    std::ostringstream os;
    write_value(os, v);
    return os.str();
}

// ---------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------

class Parser {
public:
    explicit Parser(const std::string& src) : src_(src) {}

    Value parse_document() {
        Value v = read_value();
        skip_ws();
        if (i_ != src_.size())
            throw Error("Trailing content at offset " + std::to_string(i_));
        return v;
    }

private:
    const std::string& src_;
    std::size_t i_ = 0;

    bool at_end() const { return i_ >= src_.size(); }

    void skip_ws() {
        while (i_ < src_.size()) {
            const char c = src_[i_];
            if (c == ' ' || c == '\t' || c == '\n' || c == '\r') ++i_;
            else break;
        }
    }

    [[noreturn]] void fail(const std::string& msg) const {
        throw Error(msg + " at offset " + std::to_string(i_));
    }

    void expect_word(const char* word) {
        const std::size_t n = std::char_traits<char>::length(word);
        if (src_.compare(i_, n, word) != 0) fail(std::string("Expected '") + word + "'");
        i_ += n;
    }

    Value read_value() {
        skip_ws();
        if (at_end()) fail("Unexpected end of JSON input");
        switch (src_[i_]) {
            case '{': return read_object();
            case '[': return read_array();
            case '"': return Value::make_string(read_string());
            case 't': expect_word("true");  return Value::make_bool(true);
            case 'f': expect_word("false"); return Value::make_bool(false);
            case 'n': expect_word("null");  return Value::make_null();
            default:  return read_number();
        }
    }


    Value read_object() {
        Members m;
        ++i_;                       // consume '{'
        skip_ws();
        if (!at_end() && src_[i_] == '}') { ++i_; return Value::make_object(std::move(m)); }
        for (;;) {
            skip_ws();
            if (at_end() || src_[i_] != '"') fail("Expected a string key");
            std::string key = read_string();
            skip_ws();
            if (at_end() || src_[i_] != ':') fail("Expected ':' after key '" + key + "'");
            ++i_;
            m.emplace_back(std::move(key), read_value());
            skip_ws();
            if (at_end()) fail("Unterminated object");
            const char d = src_[i_];
            if (d == ',') { ++i_; continue; }
            if (d == '}') { ++i_; return Value::make_object(std::move(m)); }
            fail("Expected ',' or '}'");
        }
    }

    Value read_array() {
        Elements e;
        ++i_;                       // consume '['
        skip_ws();
        if (!at_end() && src_[i_] == ']') { ++i_; return Value::make_array(std::move(e)); }
        for (;;) {
            e.push_back(read_value());
            skip_ws();
            if (at_end()) fail("Unterminated array");
            const char d = src_[i_];
            if (d == ',') { ++i_; continue; }
            if (d == ']') { ++i_; return Value::make_array(std::move(e)); }
            fail("Expected ',' or ']'");
        }
    }

    /** Encode one code point as UTF-8 (so \uXXXX escapes survive the round trip). */
    static void append_utf8(std::string& out, unsigned int cp) {
        if (cp < 0x80) {
            out += static_cast<char>(cp);
        } else if (cp < 0x800) {
            out += static_cast<char>(0xC0 | (cp >> 6));
            out += static_cast<char>(0x80 | (cp & 0x3F));
        } else if (cp < 0x10000) {
            out += static_cast<char>(0xE0 | (cp >> 12));
            out += static_cast<char>(0x80 | ((cp >> 6) & 0x3F));
            out += static_cast<char>(0x80 | (cp & 0x3F));
        } else {
            out += static_cast<char>(0xF0 | (cp >> 18));
            out += static_cast<char>(0x80 | ((cp >> 12) & 0x3F));
            out += static_cast<char>(0x80 | ((cp >> 6) & 0x3F));
            out += static_cast<char>(0x80 | (cp & 0x3F));
        }
    }

    unsigned int read_hex4() {
        if (i_ + 4 > src_.size()) fail("Truncated \\u escape");
        unsigned int cp = 0;
        for (int k = 0; k < 4; ++k) {
            const char c = src_[i_ + k];
            cp <<= 4;
            if      (c >= '0' && c <= '9') cp |= static_cast<unsigned int>(c - '0');
            else if (c >= 'a' && c <= 'f') cp |= static_cast<unsigned int>(c - 'a' + 10);
            else if (c >= 'A' && c <= 'F') cp |= static_cast<unsigned int>(c - 'A' + 10);
            else fail("Invalid \\u escape");
        }
        i_ += 4;
        return cp;
    }

    std::string read_string() {
        ++i_;                       // consume opening quote
        std::string out;
        for (;;) {
            if (at_end()) fail("Unterminated string");
            const char c = src_[i_++];
            if (c == '"')  return out;
            if (c != '\\') { out += c; continue; }
            if (at_end()) fail("Unterminated escape");
            const char e = src_[i_++];
            switch (e) {
                case '"':  out += '"';  break;
                case '\\': out += '\\'; break;
                case '/':  out += '/';  break;
                case 'b':  out += '\b'; break;
                case 'f':  out += '\f'; break;
                case 'n':  out += '\n'; break;
                case 'r':  out += '\r'; break;
                case 't':  out += '\t'; break;
                case 'u': {
                    unsigned int cp = read_hex4();
                    // Combine a surrogate pair when both halves are present.
                    if (cp >= 0xD800 && cp <= 0xDBFF && i_ + 1 < src_.size()
                        && src_[i_] == '\\' && src_[i_ + 1] == 'u') {
                        const std::size_t save = i_;
                        i_ += 2;
                        const unsigned int lo = read_hex4();
                        if (lo >= 0xDC00 && lo <= 0xDFFF)
                            cp = 0x10000 + ((cp - 0xD800) << 10) + (lo - 0xDC00);
                        else
                            i_ = save;
                    }
                    append_utf8(out, cp);
                    break;
                }
                default: fail(std::string("Invalid escape '\\") + e + "'");
            }
        }
    }

    Value read_number() {
        const std::size_t start = i_;
        if (!at_end() && src_[i_] == '-') ++i_;
        while (!at_end()) {
            const char c = src_[i_];
            if ((c >= '0' && c <= '9') || c == '.' || c == 'e' || c == 'E'
             || c == '+' || c == '-') ++i_;
            else break;
        }
        if (start == i_) fail("Expected a value");
        const std::string text = src_.substr(start, i_ - start);
        char* end = nullptr;
        std::strtod(text.c_str(), &end);
        if (end == text.c_str() || *end != '\0')
            throw Error("Invalid number '" + text + "' at offset " + std::to_string(start));
        return Value::make_number_raw(text);
    }
};

inline Value parse(const std::string& text) {
    Parser p(text);
    return p.parse_document();
}


// ---------------------------------------------------------------------
// Field accessors â a missing key or a wrong type throws json::Error.
// An explicit JSON null is passed through rather than treated as an error.
// ---------------------------------------------------------------------

inline const Value& require(const Value& obj, const std::string& key) {
    if (!obj.is_object()) throw Error("Expected an object holding field '" + key + "'");
    const Value* v = obj.find(key);
    if (!v) throw Error("Missing JSON field '" + key + "'");
    return *v;
}

[[noreturn]] inline void type_error(const std::string& ctx, const std::string& expected,
                                    const Value& actual) {
    throw Error("JSON field '" + ctx + "' is not " + expected + " (got " + actual.describe() + ")");
}

inline std::string as_string(const Value& v, const std::string& ctx) {
    if (v.kind() == Value::Kind::String || v.kind() == Value::Kind::Number) return v.text();
    if (v.kind() == Value::Kind::Bool)   return v.boolean() ? "true" : "false";
    if (v.is_null())                     return std::string();
    type_error(ctx, "a string", v);
}

inline double as_double(const Value& v, const std::string& ctx) {
    if (v.kind() == Value::Kind::Number || v.kind() == Value::Kind::String) {
        const std::string& t = v.text();
        char* end = nullptr;
        const double d = std::strtod(t.c_str(), &end);
        if (end != t.c_str() && *end == '\0') return d;
    }
    type_error(ctx, "a number", v);
}

inline int as_int(const Value& v, const std::string& ctx) {
    const double d = as_double(v, ctx);
    const int    i = static_cast<int>(d);
    if (static_cast<double>(i) != d) type_error(ctx, "an integer", v);
    return i;
}

inline bool as_bool(const Value& v, const std::string& ctx) {
    if (v.kind() == Value::Kind::Bool) return v.boolean();
    if (v.kind() == Value::Kind::String) {
        const std::string& t = v.text();
        if (t == "true"  || t == "t" || t == "yes" || t == "y" || t == "1") return true;
        if (t == "false" || t == "f" || t == "no"  || t == "n" || t == "0") return false;
    }
    type_error(ctx, "a boolean", v);
}

// Returns void rather than the element vector: a reference-returning accessor
// taking a string literal trips -Wdangling-reference at every call site.
// Callers check, then iterate v.elements() on their own named Value.
inline void require_array(const Value& v, const std::string& ctx) {
    if (!v.is_array()) type_error(ctx, "an array", v);
}

// ---------------------------------------------------------------------
// Convert â the customization point for field types.
//
// The default handles any user-defined DataType that is streamable with
// operator<< and constructible from std::string, matching the convention
// the generated Typed structs already use.  Specialize it for types that
// need something else.
// ---------------------------------------------------------------------

template <class T>
struct Convert {
    static Value to_json(const T& v) {
        std::ostringstream ss;
        ss << v;
        return Value::make_string(ss.str());
    }
    static T from_json(const Value& v, const std::string& ctx) {
        return T(as_string(v, ctx));
    }
};

template <>
struct Convert<std::string> {
    static Value       to_json(const std::string& v)                      { return Value::make_string(v); }
    static std::string from_json(const Value& v, const std::string& ctx)  { return as_string(v, ctx); }
};

template <>
struct Convert<int> {
    static Value to_json(int v)                                  { return Value::make_number(v); }
    static int   from_json(const Value& v, const std::string& c) { return as_int(v, c); }
};

template <>
struct Convert<double> {
    static Value  to_json(double v)                                 { return Value::make_number(v); }
    static double from_json(const Value& v, const std::string& c)   { return as_double(v, c); }
};

template <>
struct Convert<bool> {
    static Value to_json(bool v)                                  { return Value::make_bool(v); }
    static bool  from_json(const Value& v, const std::string& c)  { return as_bool(v, c); }
};

} // namespace json
