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

struct PatchTitleString {
    std::string title;

    static PatchTitleString from_vec(const std::vector<std::string>& v) {
        PatchTitleString obj;
        if (v.size() > 0) obj.title = v[0];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static PatchTitleString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 1, "PatchTitle");
        PatchTitleString obj;
        obj.title = parts[0];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(title);
        return ss.str();
    }

    bool operator==(const PatchTitleString& o) const {
        return dnc_equal(title, o.title);
    }
    bool operator!=(const PatchTitleString& o) const { return !(*this == o); }
};
