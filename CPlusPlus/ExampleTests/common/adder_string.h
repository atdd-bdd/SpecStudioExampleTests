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

struct AdderString {
    std::string number1;
    std::string number2;
    std::string result;

    static AdderString from_vec(const std::vector<std::string>& v) {
        AdderString obj;
        if (v.size() > 0) obj.number1 = v[0];
        if (v.size() > 1) obj.number2 = v[1];
        if (v.size() > 2) obj.result = v[2];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static AdderString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 3, "Adder");
        AdderString obj;
        obj.number1 = parts[0];
        obj.number2 = parts[1];
        obj.result = parts[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(number1);
        ss << " ";
        ss << tokens::token(number2);
        ss << " ";
        ss << tokens::token(result);
        return ss.str();
    }

    bool operator==(const AdderString& o) const {
        return dnc_equal(number1, o.number1)
            && dnc_equal(number2, o.number2)
            && dnc_equal(result, o.result);
    }
    bool operator!=(const AdderString& o) const { return !(*this == o); }
};
