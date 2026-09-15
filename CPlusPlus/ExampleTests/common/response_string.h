#pragma once
#include <cctype>
#include <string>
#include <vector>
#include <sstream>
#include "tokens.h"
#include "result_string.h"

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

struct ResponseString {
    ResultString result;

    static ResponseString from_vec(const std::vector<std::string>& v) {
        ResponseString obj;
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static ResponseString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 1, "Response");
        ResponseString obj;
        obj.result = ResultString::from_text(parts[0]);
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::nested(result.to_string());
        return ss.str();
    }

    bool operator==(const ResponseString& o) const {
        return result == o.result;
    }
    bool operator!=(const ResponseString& o) const { return !(*this == o); }
};
