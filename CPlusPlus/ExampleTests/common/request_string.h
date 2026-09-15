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

struct RequestString {
    std::string method;
    std::string page;
    std::string address;
    std::string benchmark;
    std::string format;

    static RequestString from_vec(const std::vector<std::string>& v) {
        RequestString obj;
        if (v.size() > 0) obj.method = v[0];
        if (v.size() > 1) obj.page = v[1];
        if (v.size() > 2) obj.address = v[2];
        if (v.size() > 3) obj.benchmark = v[3];
        if (v.size() > 4) obj.format = v[4];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static RequestString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 5, "Request");
        RequestString obj;
        obj.method = parts[0];
        obj.page = parts[1];
        obj.address = parts[2];
        obj.benchmark = parts[3];
        obj.format = parts[4];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(method);
        ss << " ";
        ss << tokens::token(page);
        ss << " ";
        ss << tokens::token(address);
        ss << " ";
        ss << tokens::token(benchmark);
        ss << " ";
        ss << tokens::token(format);
        return ss.str();
    }

    bool operator==(const RequestString& o) const {
        return dnc_equal(method, o.method)
            && dnc_equal(page, o.page)
            && dnc_equal(address, o.address)
            && dnc_equal(benchmark, o.benchmark)
            && dnc_equal(format, o.format);
    }
    bool operator!=(const RequestString& o) const { return !(*this == o); }
};
