#pragma once
#include <string>
#include <vector>
#include <sstream>

struct ValidValuesString {
    std::string value;
    std::string isvalid;
    std::string notes;

    static ValidValuesString from_vec(const std::vector<std::string>& v) {
        ValidValuesString obj;
        if (v.size() > 0) obj.value = v[0];
        if (v.size() > 1) obj.isvalid = v[1];
        if (v.size() > 2) obj.notes = v[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "Value=" << value;
        ss << ", ";
        ss << "IsValid=" << isvalid;
        ss << ", ";
        ss << "Notes=" << notes;
        return ss.str();
    }
};
