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

struct ResultString {
    std::string addressmatches;

    static ResultString from_vec(const std::vector<std::string>& v) {
        ResultString obj;
        if (v.size() > 0) obj.addressmatches = v[0];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static ResultString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 1, "Result");
        ResultString obj;
        obj.addressmatches = parts[0];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(addressmatches);
        return ss.str();
    }

    bool operator==(const ResultString& o) const {
        return dnc_equal(addressmatches, o.addressmatches);
    }
    bool operator!=(const ResultString& o) const { return !(*this == o); }
};
