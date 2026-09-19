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

struct FrameValuesString {
    std::string frame;
    std::string roll1;
    std::string roll2;
    std::string roll3;
    std::string score;
    std::string totalscore;

    static FrameValuesString from_vec(const std::vector<std::string>& v) {
        FrameValuesString obj;
        if (v.size() > 0) obj.frame = v[0];
        if (v.size() > 1) obj.roll1 = v[1];
        if (v.size() > 2) obj.roll2 = v[2];
        if (v.size() > 3) obj.roll3 = v[3];
        if (v.size() > 4) obj.score = v[4];
        if (v.size() > 5) obj.totalscore = v[5];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static FrameValuesString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 6, "FrameValues");
        FrameValuesString obj;
        obj.frame = parts[0];
        obj.roll1 = parts[1];
        obj.roll2 = parts[2];
        obj.roll3 = parts[3];
        obj.score = parts[4];
        obj.totalscore = parts[5];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(frame);
        ss << " ";
        ss << tokens::token(roll1);
        ss << " ";
        ss << tokens::token(roll2);
        ss << " ";
        ss << tokens::token(roll3);
        ss << " ";
        ss << tokens::token(score);
        ss << " ";
        ss << tokens::token(totalscore);
        return ss.str();
    }

    bool operator==(const FrameValuesString& o) const {
        return dnc_equal(frame, o.frame)
            && dnc_equal(roll1, o.roll1)
            && dnc_equal(roll2, o.roll2)
            && dnc_equal(roll3, o.roll3)
            && dnc_equal(score, o.score)
            && dnc_equal(totalscore, o.totalscore);
    }
    bool operator!=(const FrameValuesString& o) const { return !(*this == o); }
};
