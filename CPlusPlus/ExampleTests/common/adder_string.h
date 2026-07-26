#pragma once
#include <string>
#include <vector>
#include <sstream>

struct AdderString {
    std::string number1;
    std::string number2;
    std::string result;

    static AdderString from_vec(const std::vector<std::string>& v) {
        AdderString obj;
        if (v.size() > 0) obj.number1 = v[0];
        if (v.size() > 1) obj.number2 = v[1];
        if (v.size() > 2) obj.result = v[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "number1=" << number1;
        ss << ", ";
        ss << "number2=" << number2;
        ss << ", ";
        ss << "result=" << result;
        return ss.str();
    }
};
