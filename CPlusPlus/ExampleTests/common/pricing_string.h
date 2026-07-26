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

struct PricingString {
    std::string totalprice;

    static PricingString from_vec(const std::vector<std::string>& v) {
        PricingString obj;
        if (v.size() > 0) obj.totalprice = v[0];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "TotalPrice=" << totalprice;
        return ss.str();
    }

    bool operator==(const PricingString& o) const {
        return dnc_equal(totalprice, o.totalprice);
    }
    bool operator!=(const PricingString& o) const { return !(*this == o); }
};
