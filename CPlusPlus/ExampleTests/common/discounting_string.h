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

struct DiscountingString {
    std::string total_price;
    std::string discount;
    std::string notes;

    static DiscountingString from_vec(const std::vector<std::string>& v) {
        DiscountingString obj;
        if (v.size() > 0) obj.total_price = v[0];
        if (v.size() > 1) obj.discount = v[1];
        if (v.size() > 2) obj.notes = v[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Total Price=" << total_price;
        ss << ", ";
        ss << "Discount=" << discount;
        ss << ", ";
        ss << "Notes=" << notes;
        return ss.str();
    }

    bool operator==(const DiscountingString& o) const {
        return dnc_equal(total_price, o.total_price)
            && dnc_equal(discount, o.discount)
            && dnc_equal(notes, o.notes);
    }
    bool operator!=(const DiscountingString& o) const { return !(*this == o); }
};
