#pragma once
// The text form of the DataType SimpleText, as a table cell holds it.
// SimpleTextTyped holds the value itself; this one names the type in a
// signature while behaving like the text it is. It converts to and from a
// string implicitly, so glue written against the text keeps working and a
// cell can be compared, streamed or handed to the production class directly.
// Comparison and empty() are its own, for the reason given above them.

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

struct SimpleTextString {
    std::string value;

    SimpleTextString() = default;
    SimpleTextString(const char* text) : value(text ? text : "") {}
    SimpleTextString(std::string text) : value(std::move(text)) {}

    operator const std::string&() const { return value; }

    static SimpleTextString from_text(const std::string& text) { return SimpleTextString(text); }
    std::string to_string() const { return value; }
    bool empty() const { return value.empty(); }
};

inline bool operator==(const SimpleTextString& a, const SimpleTextString& b) { return a.value == b.value; }
inline bool operator!=(const SimpleTextString& a, const SimpleTextString& b) { return !(a == b); }
inline bool operator==(const SimpleTextString& a, const std::string& b) { return a.value == b; }
inline bool operator!=(const SimpleTextString& a, const std::string& b) { return !(a == b); }
inline bool operator==(const std::string& a, const SimpleTextString& b) { return a == b.value; }
inline bool operator!=(const std::string& a, const SimpleTextString& b) { return !(a == b); }
inline bool operator==(const SimpleTextString& a, const char* b) { return a.value == (b ? b : ""); }
inline bool operator!=(const SimpleTextString& a, const char* b) { return !(a == b); }
inline bool operator==(const char* a, const SimpleTextString& b) { return (a ? a : "") == b.value; }
inline bool operator!=(const char* a, const SimpleTextString& b) { return !(a == b); }
inline std::ostream& operator<<(std::ostream& os, const SimpleTextString& v) { return os << v.value; }
