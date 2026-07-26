#pragma once
#include <string>
#include <vector>
#include <sstream>

struct AddressString {
    std::string street;
    std::string city;
    std::string state;
    std::string zip;

    static AddressString from_vec(const std::vector<std::string>& v) {
        AddressString obj;
        if (v.size() > 0) obj.street = v[0];
        if (v.size() > 1) obj.city = v[1];
        if (v.size() > 2) obj.state = v[2];
        if (v.size() > 3) obj.zip = v[3];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Street=" << street;
        ss << ", ";
        ss << "City=" << city;
        ss << ", ";
        ss << "State=" << state;
        ss << ", ";
        ss << "ZIP=" << zip;
        return ss.str();
    }
};
