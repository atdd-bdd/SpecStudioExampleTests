#pragma once
#include <string>
#include <vector>
#include <sstream>

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
};
