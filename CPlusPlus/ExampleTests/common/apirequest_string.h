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

struct ApiRequestString {
    std::string method;
    std::string page;
    std::string parameter;
    std::string body;

    static ApiRequestString from_vec(const std::vector<std::string>& v) {
        ApiRequestString obj;
        if (v.size() > 0) obj.method = v[0];
        if (v.size() > 1) obj.page = v[1];
        if (v.size() > 2) obj.parameter = v[2];
        if (v.size() > 3) obj.body = v[3];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static ApiRequestString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 4, "ApiRequest");
        ApiRequestString obj;
        obj.method = parts[0];
        obj.page = parts[1];
        obj.parameter = parts[2];
        obj.body = parts[3];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(method);
        ss << " ";
        ss << tokens::token(page);
        ss << " ";
        ss << tokens::token(parameter);
        ss << " ";
        ss << tokens::token(body);
        return ss.str();
    }

    bool operator==(const ApiRequestString& o) const {
        return dnc_equal(method, o.method)
            && dnc_equal(page, o.page)
            && dnc_equal(parameter, o.parameter)
            && dnc_equal(body, o.body);
    }
    bool operator!=(const ApiRequestString& o) const { return !(*this == o); }
};
