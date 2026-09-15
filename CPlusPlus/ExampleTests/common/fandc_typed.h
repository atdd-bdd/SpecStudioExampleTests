#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "fandc_string.h"

struct FandCTyped {
    int f = 0;
    int c = 0;
    std::string notes;

    static FandCTyped from_string_struct(const FandCString& s) {
        FandCTyped t;
        t.f = !s.f.empty() ? std::stoi(s.f) : 0;
        t.c = !s.c.empty() ? std::stoi(s.c) : 0;
        t.notes = s.notes;
        return t;
    }

    FandCString to_string_struct() const {
        FandCString s;
        s.f = std::to_string(f);
        s.c = std::to_string(c);
        s.notes = notes;
        return s;
    }

    static std::vector<FandCString> to_string_list(const std::vector<FandCTyped>& list) {
        std::vector<FandCString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<FandCTyped> from_string_list(const std::vector<FandCString>& list) {
        std::vector<FandCTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("F", json::Convert<int>::to_json(f));
        m.emplace_back("C", json::Convert<int>::to_json(c));
        m.emplace_back("Notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static FandCTyped from_json_value(const json::Value& v) {
        FandCTyped t;
        t.f = json::Convert<int>::from_json(json::require(v, "F"), "F");
        t.c = json::Convert<int>::from_json(json::require(v, "C"), "C");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "Notes"), "Notes");
        return t;
    }

    static FandCTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<FandCTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<FandCTyped> from_json_list(const std::string& text) {
        std::vector<FandCTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "FandCTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const FandCTyped& o) const {
        return f == o.f
            && c == o.c
            && notes == o.notes;
    }
    bool operator!=(const FandCTyped& o) const { return !(*this == o); }
};
