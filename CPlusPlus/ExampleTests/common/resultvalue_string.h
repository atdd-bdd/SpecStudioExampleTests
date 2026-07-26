#pragma once
#include <string>
#include <vector>
#include <sstream>

struct ResultValueString {
    std::string sum;

    static ResultValueString from_vec(const std::vector<std::string>& v) {
        ResultValueString obj;
        if (v.size() > 0) obj.sum = v[0];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Sum=" << sum;
        return ss.str();
    }
};
