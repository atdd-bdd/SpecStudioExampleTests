#pragma once
#include <string>
#include <vector>
#include <sstream>

struct FilterValueString {
    std::string value;

    static FilterValueString from_vec(const std::vector<std::string>& v) {
        FilterValueString obj;
        if (v.size() > 0) obj.value = v[0];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Value=" << value;
        return ss.str();
    }
};
