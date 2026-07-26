#pragma once
#include <string>
#include <vector>
#include <sstream>

struct FandCString {
    std::string f;
    std::string c;
    std::string notes;

    static FandCString from_vec(const std::vector<std::string>& v) {
        FandCString obj;
        if (v.size() > 0) obj.f = v[0];
        if (v.size() > 1) obj.c = v[1];
        if (v.size() > 2) obj.notes = v[2];
        return obj;
    }

    std::string to_string() const {
        std::ostringstream ss;
        ss << "F=" << f;
        ss << ", ";
        ss << "C=" << c;
        ss << ", ";
        ss << "Notes=" << notes;
        return ss.str();
    }
};
