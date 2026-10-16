#pragma once
// The text form of the DataType Dollar, as a table cell holds it.
// DollarTyped holds the value itself; this one names the type in a
// signature while behaving like the text it is. It converts to and from a
// string implicitly, so glue written against the text keeps working and a
// cell can be compared, streamed or handed to the production class directly.
// No operator== of its own, deliberately: one would make `cell == "x"`
// ambiguous against the string comparison the conversion already allows.

#include <cctype>
#include <ostream>
#include <string>
#include <utility>

#ifndef SPECTABLE_DNC_STRING
#define SPECTABLE_DNC_STRING
inline const std::string DNCString = "?DNC?";
inline bool dnc_equal(const std::string& a, const std::string& b) {
    return a == b || a == DNCString || b == DNCString;
}
// Reads the Yes/No/True/False text a spec cell may hold, in any casing.
inline bool parse_bool_cell(const std::string& v) {
    std::string t;
    for (char c : v) t += static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
    return t == "true" || t == "t" || t == "yes" || t == "y" || t == "1";
}
#endif

struct DollarString {
    std::string value;

    DollarString() = default;
    DollarString(const char* text) : value(text ? text : "") {}
    DollarString(std::string text) : value(std::move(text)) {}

    operator const std::string&() const { return value; }

    static DollarString from_text(const std::string& text) { return DollarString(text); }
    std::string to_string() const { return value; }
};

inline std::ostream& operator<<(std::ostream& os, const DollarString& v) { return os << v.value; }
