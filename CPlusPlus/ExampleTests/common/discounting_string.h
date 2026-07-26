#pragma once
#include <string>
#include <vector>
#include <sstream>

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
};
