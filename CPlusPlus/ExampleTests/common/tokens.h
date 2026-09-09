#pragma once

#include <cctype>
#include <stdexcept>
#include <string>
#include <vector>

// The text form of an Entity: its attribute values as space separated tokens,
// in the order the attributes are declared. A value containing a space is
// wrapped in double quotes; a nested Entity's own text form is wrapped in
// single quotes. A run of spaces separates exactly as a single space does.

namespace tokens {

inline bool is_space(char c) {
    return std::isspace(static_cast<unsigned char>(c)) != 0;
}

// The closing quote is the next one of the same kind followed by whitespace
// or the end of the text, which is what lets a nested Entity, itself single
// quoted, sit inside a single quoted value.
inline std::string::size_type closing_quote(const std::string& text,
                                           std::string::size_type open,
                                           char quote) {
    for (std::string::size_type j = open + 1; j < text.size(); ++j) {
        if (text[j] != quote) continue;
        if (j + 1 == text.size() || is_space(text[j + 1])) return j;
    }
    return std::string::npos;
}

inline std::vector<std::string> split(const std::string& text) {
    std::vector<std::string> out;
    std::string::size_type i = 0;
    while (i < text.size()) {
        while (i < text.size() && is_space(text[i])) ++i;
        if (i >= text.size()) break;
        const char c = text[i];
        if (c == '"' || c == '\'') {
            const std::string::size_type close = closing_quote(text, i, c);
            if (close == std::string::npos) { out.push_back(text.substr(i + 1)); break; }
            out.push_back(text.substr(i + 1, close - i - 1));
            i = close + 1;
        } else {
            std::string::size_type j = i;
            while (j < text.size() && !is_space(text[j])) ++j;
            out.push_back(text.substr(i, j - i));
            i = j;
        }
    }
    return out;
}

inline std::string token(const std::string& value) {
    if (value.empty()) return "\"\"";
    for (char c : value) if (is_space(c)) return "\"" + value + "\"";
    return value;
}

inline std::string nested(const std::string& text) {
    return "'" + text + "'";
}

inline std::vector<std::string> require(const std::string& text, std::size_t expected,
                                       const std::string& type_name) {
    std::vector<std::string> parts = split(text);
    if (parts.size() != expected)
        throw std::invalid_argument(type_name + " takes " + std::to_string(expected)
            + " values but got " + std::to_string(parts.size()) + ": " + text);
    return parts;
}

} // namespace tokens
