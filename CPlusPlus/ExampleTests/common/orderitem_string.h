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

struct OrderItemString {
    std::string name;
    std::string quantity;
    std::string price;
    std::string itemtotal;

    static OrderItemString from_vec(const std::vector<std::string>& v) {
        OrderItemString obj;
        if (v.size() > 0) obj.name = v[0];
        if (v.size() > 1) obj.quantity = v[1];
        if (v.size() > 2) obj.price = v[2];
        if (v.size() > 3) obj.itemtotal = v[3];
        return obj;
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    static OrderItemString from_text(const std::string& text) {
        const std::vector<std::string> parts = tokens::require(text, 4, "OrderItem");
        OrderItemString obj;
        obj.name = parts[0];
        obj.quantity = parts[1];
        obj.price = parts[2];
        obj.itemtotal = parts[3];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << tokens::token(name);
        ss << " ";
        ss << tokens::token(quantity);
        ss << " ";
        ss << tokens::token(price);
        ss << " ";
        ss << tokens::token(itemtotal);
        return ss.str();
    }

    bool operator==(const OrderItemString& o) const {
        return dnc_equal(name, o.name)
            && dnc_equal(quantity, o.quantity)
            && dnc_equal(price, o.price)
            && dnc_equal(itemtotal, o.itemtotal);
    }
    bool operator!=(const OrderItemString& o) const { return !(*this == o); }
};
