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

struct AddressComponentsString {
    std::string zip;
    std::string streetname;
    std::string city;
    std::string predirection;
    std::string suffixdirection;
    std::string state;
    std::string suffixtype;

    static AddressComponentsString from_vec(const std::vector<std::string>& v) {
        AddressComponentsString obj;
        if (v.size() > 0) obj.zip = v[0];
        if (v.size() > 1) obj.streetname = v[1];
        if (v.size() > 2) obj.city = v[2];
        if (v.size() > 3) obj.predirection = v[3];
        if (v.size() > 4) obj.suffixdirection = v[4];
        if (v.size() > 5) obj.state = v[5];
        if (v.size() > 6) obj.suffixtype = v[6];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static AddressComponentsString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 7, "AddressComponents");
        AddressComponentsString obj;
        obj.zip = parts[0];
        obj.streetname = parts[1];
        obj.city = parts[2];
        obj.predirection = parts[3];
        obj.suffixdirection = parts[4];
        obj.state = parts[5];
        obj.suffixtype = parts[6];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(zip);
        ss << " ";
        ss << tokens::token(streetname);
        ss << " ";
        ss << tokens::token(city);
        ss << " ";
        ss << tokens::token(predirection);
        ss << " ";
        ss << tokens::token(suffixdirection);
        ss << " ";
        ss << tokens::token(state);
        ss << " ";
        ss << tokens::token(suffixtype);
        return ss.str();
    }

    bool operator==(const AddressComponentsString& o) const {
        return dnc_equal(zip, o.zip)
            && dnc_equal(streetname, o.streetname)
            && dnc_equal(city, o.city)
            && dnc_equal(predirection, o.predirection)
            && dnc_equal(suffixdirection, o.suffixdirection)
            && dnc_equal(state, o.state)
            && dnc_equal(suffixtype, o.suffixtype);
    }
    bool operator!=(const AddressComponentsString& o) const { return !(*this == o); }
};
