#pragma once
#include <cctype>
#include <string>
#include <vector>
#include <sstream>
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

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Items=" << items;
        ss << ", ";
        ss << "Shipping=" << shipping;
        ss << ", ";
        ss << "Discount=" << discount;
        ss << ", ";
        ss << "TotalPrice=" << totalprice;
        ss << ", ";
        ss << "ShippingAddress=" << shippingaddress.to_string();
        ss << ", ";
        ss << "BillingAddress=" << billingaddress.to_string();
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
