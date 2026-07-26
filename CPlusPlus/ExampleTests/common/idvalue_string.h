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

struct IDValueString {
    std::string id;
    std::string value;

    static IDValueString from_vec(const std::vector<std::string>& v) {
        IDValueString obj;
        if (v.size() > 0) obj.id = v[0];
        if (v.size() > 1) obj.value = v[1];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "ID=" << id;
        ss << ", ";
        ss << "Value=" << value;
        return ss.str();
    }

    bool operator==(const IDValueString& o) const {
        return dnc_equal(id, o.id)
            && dnc_equal(value, o.value);
    }
    bool operator!=(const IDValueString& o) const { return !(*this == o); }
};
