#pragma once
#include <string>
#include <vector>
#include <sstream>

struct ShoppingCartString {
    std::string items;
    std::string shipping;
    std::string discount;
    std::string totalprice;
    std::string shippingaddress;
    std::string billingaddress;

    static ShoppingCartString from_vec(const std::vector<std::string>& v) {
        ShoppingCartString obj;
        if (v.size() > 0) obj.items = v[0];
        if (v.size() > 1) obj.shipping = v[1];
        if (v.size() > 2) obj.discount = v[2];
        if (v.size() > 3) obj.totalprice = v[3];
        if (v.size() > 4) obj.shippingaddress = v[4];
        if (v.size() > 5) obj.billingaddress = v[5];
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
        ss << "ShippingAddress=" << shippingaddress;
        ss << ", ";
        ss << "BillingAddress=" << billingaddress;
        return ss.str();
    }
};
