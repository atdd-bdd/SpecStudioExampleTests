#pragma once
#include <cctype>
#include <string>
#include <vector>
#include <sstream>
#include "tokens.h"

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

struct InputControlValuesString {
    std::string frame;
    std::string roll;
    std::string remaining;

    static InputControlValuesString from_vec(const std::vector<std::string>& v) {
        InputControlValuesString obj;
        if (v.size() > 0) obj.frame = v[0];
        if (v.size() > 1) obj.roll = v[1];
        if (v.size() > 2) obj.remaining = v[2];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static InputControlValuesString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 3, "InputControlValues");
        InputControlValuesString obj;
        obj.frame = parts[0];
        obj.roll = parts[1];
        obj.remaining = parts[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(frame);
        ss << " ";
        ss << tokens::token(roll);
        ss << " ";
        ss << tokens::token(remaining);
        return ss.str();
    }

    bool operator==(const InputControlValuesString& o) const {
        return dnc_equal(frame, o.frame)
            && dnc_equal(roll, o.roll)
            && dnc_equal(remaining, o.remaining);
    }
    bool operator!=(const InputControlValuesString& o) const { return !(*this == o); }
};
