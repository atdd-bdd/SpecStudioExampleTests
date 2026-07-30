#pragma once
// The compact JSON-like text used by the Json specification: names are not
// quoted, values are, and whitespace between tokens is insignificant.
//
//     {anInt:"1",aString:"B"}
//     [{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]
//
// Field order is preserved, so a canonical form can be compared directly.

#include <cctype>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace simple_json {

/// One name/value pair. A vector of these keeps the declared order, which a map
/// would not.
using Field  = std::pair<std::string, std::string>;
using Fields = std::vector<Field>;

// -----------------------------------------------------------------------------
// Writing
// -----------------------------------------------------------------------------

inline void append_quoted(std::string& out, const std::string& value) {
    out += '"';
    for (char c : value) {
        if (c == '"' || c == '\\') out += '\\';
        out += c;
    }
    out += '"';
}

inline std::string to_object(const Fields& fields) {
    std::string out = "{";
    for (std::size_t i = 0; i < fields.size(); ++i) {
        if (i) out += ',';
        out += fields[i].first;
        out += ':';
        append_quoted(out, fields[i].second);
    }
    out += '}';
    return out;
}

inline std::string to_array(const std::vector<Fields>& rows) {
    std::string out = "[";
    for (std::size_t i = 0; i < rows.size(); ++i) {
        if (i) out += ',';
        out += to_object(rows[i]);
    }
    out += ']';
    return out;
}

// -----------------------------------------------------------------------------
// Reading
// -----------------------------------------------------------------------------

class Cursor {
public:
    explicit Cursor(const std::string& text) : text_(text) {}

    std::size_t pos() const { return i_; }
    bool at_end() const { return i_ >= text_.size(); }
    char peek() const { return at_end() ? '\0' : text_[i_]; }
    char next() { return at_end() ? '\0' : text_[i_++]; }

    void skip_whitespace() {
        while (!at_end() && std::isspace(static_cast<unsigned char>(text_[i_]))) ++i_;
    }

    void expect(char expected) {
        skip_whitespace();
        if (next() != expected)
            throw std::invalid_argument(std::string("Expected '") + expected + "' at "
                                        + std::to_string(i_));
    }

private:
    const std::string& text_;
    std::size_t i_ = 0;
};

inline std::string read_quoted(Cursor& c) {
    c.expect('"');
    std::string out;
    for (;;) {
        if (c.at_end())
            throw std::invalid_argument("Unterminated string at " + std::to_string(c.pos()));
        char ch = c.next();
        if (ch == '"') return out;
        if (ch == '\\' && !c.at_end()) ch = c.next();
        out += ch;
    }
}

inline std::string trimmed(const std::string& s) {
    std::size_t b = 0, e = s.size();
    while (b < e && std::isspace(static_cast<unsigned char>(s[b]))) ++b;
    while (e > b && std::isspace(static_cast<unsigned char>(s[e - 1]))) --e;
    return s.substr(b, e - b);
}

/// A name is bare text up to the colon, or a quoted string.
inline std::string read_name(Cursor& c) {
    if (c.peek() == '"') return read_quoted(c);
    std::string out;
    while (!c.at_end() && c.peek() != ':') out += c.next();
    return trimmed(out);
}

/// A value is a quoted string, or bare text up to the next ',' or '}'.
inline std::string read_value(Cursor& c) {
    if (c.peek() == '"') return read_quoted(c);
    std::string out;
    while (!c.at_end() && c.peek() != ',' && c.peek() != '}') out += c.next();
    return trimmed(out);
}

inline Fields read_object(Cursor& c) {
    c.skip_whitespace();
    c.expect('{');
    Fields fields;
    c.skip_whitespace();
    if (c.peek() == '}') { c.next(); return fields; }

    for (;;) {
        c.skip_whitespace();
        std::string name = read_name(c);
        c.skip_whitespace();
        c.expect(':');
        c.skip_whitespace();
        fields.emplace_back(name, read_value(c));
        c.skip_whitespace();
        const char d = c.next();
        if (d == ',') continue;
        if (d == '}') return fields;
        throw std::invalid_argument("Expected ',' or '}' at " + std::to_string(c.pos()));
    }
}

inline Fields parse_object(const std::string& text) {
    Cursor c(text);
    Fields fields = read_object(c);
    c.skip_whitespace();
    if (!c.at_end())
        throw std::invalid_argument("Unexpected text after object at " + std::to_string(c.pos()));
    return fields;
}

inline std::vector<Fields> parse_array(const std::string& text) {
    Cursor c(text);
    c.skip_whitespace();
    c.expect('[');
    std::vector<Fields> rows;
    c.skip_whitespace();
    if (c.peek() == ']') {
        c.next();
    } else {
        for (;;) {
            rows.push_back(read_object(c));
            c.skip_whitespace();
            const char d = c.next();
            if (d == ',') continue;
            if (d == ']') break;
            throw std::invalid_argument("Expected ',' or ']' at " + std::to_string(c.pos()));
        }
    }
    c.skip_whitespace();
    if (!c.at_end())
        throw std::invalid_argument("Unexpected text after array at " + std::to_string(c.pos()));
    return rows;
}

/// Removes whitespace that sits between tokens, leaving a plain string that can
/// be compared to another one directly. Whitespace inside a quoted value is part
/// of the value and is kept.
inline std::string without_whitespace(const std::string& text) {
    std::string out;
    out.reserve(text.size());
    bool in_quotes = false;
    for (std::size_t i = 0; i < text.size(); ++i) {
        const char c = text[i];
        if (in_quotes) {
            out += c;
            if (c == '\\' && i + 1 < text.size()) {
                out += text[i + 1];
                ++i;
            } else if (c == '"') {
                in_quotes = false;
            }
        } else if (c == '"') {
            in_quotes = true;
            out += c;
        } else if (!std::isspace(static_cast<unsigned char>(c))) {
            out += c;
        }
    }
    return out;
}

}  // namespace simple_json
