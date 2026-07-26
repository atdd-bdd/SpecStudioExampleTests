#pragma once
#include <string>
#include <vector>
#include <sstream>

struct CatalogItemString {
    std::string name;
    std::string price;

    static CatalogItemString from_vec(const std::vector<std::string>& v) {
        CatalogItemString obj;
        if (v.size() > 0) obj.name = v[0];
        if (v.size() > 1) obj.price = v[1];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Name=" << name;
        ss << ", ";
        ss << "Price=" << price;
        return ss.str();
    }
};
