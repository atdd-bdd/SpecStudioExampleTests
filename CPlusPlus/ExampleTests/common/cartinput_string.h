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

struct CartInputString {
    std::string totalitems;
    std::string shipping;
    std::string discount;
    std::string total_price;
    std::string notes;

    static CartInputString from_vec(const std::vector<std::string>& v) {
        CartInputString obj;
        if (v.size() > 0) obj.totalitems = v[0];
        if (v.size() > 1) obj.shipping = v[1];
        if (v.size() > 2) obj.discount = v[2];
        if (v.size() > 3) obj.total_price = v[3];
        if (v.size() > 4) obj.notes = v[4];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static CartInputString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 5, "CartInput");
        CartInputString obj;
        obj.totalitems = parts[0];
        obj.shipping = parts[1];
        obj.discount = parts[2];
        obj.total_price = parts[3];
        obj.notes = parts[4];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(totalitems);
        ss << " ";
        ss << tokens::token(shipping);
        ss << " ";
        ss << tokens::token(discount);
        ss << " ";
        ss << tokens::token(total_price);
        ss << " ";
        ss << tokens::token(notes);
        return ss.str();
    }

    bool operator==(const CartInputString& o) const {
        return dnc_equal(totalitems, o.totalitems)
            && dnc_equal(shipping, o.shipping)
            && dnc_equal(discount, o.discount)
            && dnc_equal(total_price, o.total_price)
            && dnc_equal(notes, o.notes);
    }
    bool operator!=(const CartInputString& o) const { return !(*this == o); }
};
