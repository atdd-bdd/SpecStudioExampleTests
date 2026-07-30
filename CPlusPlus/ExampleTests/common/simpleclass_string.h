#pragma once
#include <cctype>
#include <string>
#include <vector>
#include <sstream>

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

struct SimpleClassString {
    std::string anint;
    std::string astring;

    static SimpleClassString from_vec(const std::vector<std::string>& v) {
        SimpleClassString obj;
        if (v.size() > 0) obj.anint = v[0];
        if (v.size() > 1) obj.astring = v[1];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "anInt=" << anint;
        ss << ", ";
        ss << "aString=" << astring;
        return ss.str();
    }

    bool operator==(const SimpleClassString& o) const {
        return dnc_equal(anint, o.anint)
            && dnc_equal(astring, o.astring);
    }
    bool operator!=(const SimpleClassString& o) const { return !(*this == o); }
};
