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

struct StatusString {
    std::string code;

    static StatusString from_vec(const std::vector<std::string>& v) {
        StatusString obj;
        if (v.size() > 0) obj.code = v[0];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static StatusString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 1, "Status");
        StatusString obj;
        obj.code = parts[0];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(code);
        return ss.str();
    }

    bool operator==(const StatusString& o) const {
        return dnc_equal(code, o.code);
    }
    bool operator!=(const StatusString& o) const { return !(*this == o); }
};
