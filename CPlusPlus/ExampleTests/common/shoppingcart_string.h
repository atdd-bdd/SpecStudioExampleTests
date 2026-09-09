#pragma once
#include <cctype>
#include <string>
#include <vector>
#include <sstream>
#include "tokens.h"
#include "address_string.h"

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

struct ShoppingCartString {
    std::string items;
    std::string shipping;
    std::string discount;
    std::string totalprice;
    AddressString shippingaddress;
    AddressString billingaddress;

    static ShoppingCartString from_vec(const std::vector<std::string>& v) {
        ShoppingCartString obj;
        if (v.size() > 0) obj.items = v[0];
        if (v.size() > 1) obj.shipping = v[1];
        if (v.size() > 2) obj.discount = v[2];
        if (v.size() > 3) obj.totalprice = v[3];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static ShoppingCartString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 6, "ShoppingCart");
        ShoppingCartString obj;
        obj.items = parts[0];
        obj.shipping = parts[1];
        obj.discount = parts[2];
        obj.totalprice = parts[3];
        obj.shippingaddress = AddressString::from_text(parts[4]);
        obj.billingaddress = AddressString::from_text(parts[5]);
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(items);
        ss << " ";
        ss << tokens::token(shipping);
        ss << " ";
        ss << tokens::token(discount);
        ss << " ";
        ss << tokens::token(totalprice);
        ss << " ";
        ss << tokens::nested(shippingaddress.to_string());
        ss << " ";
        ss << tokens::nested(billingaddress.to_string());
        return ss.str();
    }

    bool operator==(const ShoppingCartString& o) const {
        return dnc_equal(items, o.items)
            && dnc_equal(shipping, o.shipping)
            && dnc_equal(discount, o.discount)
            && dnc_equal(totalprice, o.totalprice)
            && shippingaddress == o.shippingaddress
            && billingaddress == o.billingaddress;
    }
    bool operator!=(const ShoppingCartString& o) const { return !(*this == o); }
};
