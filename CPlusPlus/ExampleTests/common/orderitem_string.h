#pragma once
#include <string>
#include <vector>
#include <sstream>

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

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Name=" << name;
        ss << ", ";
        ss << "Quantity=" << quantity;
        ss << ", ";
        ss << "Price=" << price;
        ss << ", ";
        ss << "ItemTotal=" << itemtotal;
        return ss.str();
    }
};
