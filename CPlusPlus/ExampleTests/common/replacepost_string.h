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

struct ReplacePostString {
    std::string id;
    std::string userid;
    std::string title;
    std::string body;

    static ReplacePostString from_vec(const std::vector<std::string>& v) {
        ReplacePostString obj;
        if (v.size() > 0) obj.id = v[0];
        if (v.size() > 1) obj.userid = v[1];
        if (v.size() > 2) obj.title = v[2];
        if (v.size() > 3) obj.body = v[3];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static ReplacePostString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 4, "ReplacePost");
        ReplacePostString obj;
        obj.id = parts[0];
        obj.userid = parts[1];
        obj.title = parts[2];
        obj.body = parts[3];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(id);
        ss << " ";
        ss << tokens::token(userid);
        ss << " ";
        ss << tokens::token(title);
        ss << " ";
        ss << tokens::token(body);
        return ss.str();
    }

    bool operator==(const ReplacePostString& o) const {
        return dnc_equal(id, o.id)
            && dnc_equal(userid, o.userid)
            && dnc_equal(title, o.title)
            && dnc_equal(body, o.body);
    }
    bool operator!=(const ReplacePostString& o) const { return !(*this == o); }
};
