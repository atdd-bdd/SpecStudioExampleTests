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

struct NewPostString {
    std::string title;
    std::string body;
    std::string userid;

    static NewPostString from_vec(const std::vector<std::string>& v) {
        NewPostString obj;
        if (v.size() > 0) obj.title = v[0];
        if (v.size() > 1) obj.body = v[1];
        if (v.size() > 2) obj.userid = v[2];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static NewPostString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 3, "NewPost");
        NewPostString obj;
        obj.title = parts[0];
        obj.body = parts[1];
        obj.userid = parts[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(title);
        ss << " ";
        ss << tokens::token(body);
        ss << " ";
        ss << tokens::token(userid);
        return ss.str();
    }

    bool operator==(const NewPostString& o) const {
        return dnc_equal(title, o.title)
            && dnc_equal(body, o.body)
            && dnc_equal(userid, o.userid);
    }
    bool operator!=(const NewPostString& o) const { return !(*this == o); }
};
