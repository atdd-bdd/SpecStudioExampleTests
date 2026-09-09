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

struct AddressString {
    std::string street;
    std::string city;
    std::string state;
    std::string zip;

    static AddressString from_vec(const std::vector<std::string>& v) {
        AddressString obj;
        if (v.size() > 0) obj.street = v[0];
        if (v.size() > 1) obj.city = v[1];
        if (v.size() > 2) obj.state = v[2];
        if (v.size() > 3) obj.zip = v[3];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static AddressString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 4, "Address");
        AddressString obj;
        obj.street = parts[0];
        obj.city = parts[1];
        obj.state = parts[2];
        obj.zip = parts[3];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(street);
        ss << " ";
        ss << tokens::token(city);
        ss << " ";
        ss << tokens::token(state);
        ss << " ";
        ss << tokens::token(zip);
        return ss.str();
    }

    bool operator==(const AddressString& o) const {
        return dnc_equal(street, o.street)
            && dnc_equal(city, o.city)
            && dnc_equal(state, o.state)
            && dnc_equal(zip, o.zip);
    }
    bool operator!=(const AddressString& o) const { return !(*this == o); }
};
