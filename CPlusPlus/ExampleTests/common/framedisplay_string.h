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

struct FrameDisplayString {
    std::string frame;
    std::string mark1;
    std::string mark2;
    std::string mark3;
    std::string totalscore;

    static FrameDisplayString from_vec(const std::vector<std::string>& v) {
        FrameDisplayString obj;
        if (v.size() > 0) obj.frame = v[0];
        if (v.size() > 1) obj.mark1 = v[1];
        if (v.size() > 2) obj.mark2 = v[2];
        if (v.size() > 3) obj.mark3 = v[3];
        if (v.size() > 4) obj.totalscore = v[4];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static FrameDisplayString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 5, "FrameDisplay");
        FrameDisplayString obj;
        obj.frame = parts[0];
        obj.mark1 = parts[1];
        obj.mark2 = parts[2];
        obj.mark3 = parts[3];
        obj.totalscore = parts[4];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(frame);
        ss << " ";
        ss << tokens::token(mark1);
        ss << " ";
        ss << tokens::token(mark2);
        ss << " ";
        ss << tokens::token(mark3);
        ss << " ";
        ss << tokens::token(totalscore);
        return ss.str();
    }

    bool operator==(const FrameDisplayString& o) const {
        return dnc_equal(frame, o.frame)
            && dnc_equal(mark1, o.mark1)
            && dnc_equal(mark2, o.mark2)
            && dnc_equal(mark3, o.mark3)
            && dnc_equal(totalscore, o.totalscore);
    }
    bool operator!=(const FrameDisplayString& o) const { return !(*this == o); }
};
