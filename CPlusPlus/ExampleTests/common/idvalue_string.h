#pragma once
#include <string>
#include <vector>
#include <sstream>

struct IDValueString {
    std::string id;
    std::string value;

    static IDValueString from_vec(const std::vector<std::string>& v) {
        IDValueString obj;
        if (v.size() > 0) obj.id = v[0];
        if (v.size() > 1) obj.value = v[1];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "ID=" << id;
        ss << ", ";
        ss << "Value=" << value;
        return ss.str();
    }
};
