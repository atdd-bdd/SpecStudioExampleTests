#pragma once
#include <string>
#include <vector>
#include <sstream>

struct ShippingString {
    std::string total_price;
    std::string shipping_cost;
    std::string notes;

    static ShippingString from_vec(const std::vector<std::string>& v) {
        ShippingString obj;
        if (v.size() > 0) obj.total_price = v[0];
        if (v.size() > 1) obj.shipping_cost = v[1];
        if (v.size() > 2) obj.notes = v[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Total Price=" << total_price;
        ss << ", ";
        ss << "Shipping Cost=" << shipping_cost;
        ss << ", ";
        ss << "Notes=" << notes;
        return ss.str();
    }
};
