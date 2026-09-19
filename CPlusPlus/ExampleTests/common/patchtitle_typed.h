#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "patchtitle_string.h"

struct PatchTitleTyped {
    std::string title;

    static PatchTitleTyped from_string_struct(const PatchTitleString& s) {
        PatchTitleTyped t;
        t.title = s.title;
        return t;
    }

    PatchTitleString to_string_struct() const {
        PatchTitleString s;
        s.title = title;
        return s;
    }

    static std::vector<PatchTitleString> to_string_list(const std::vector<PatchTitleTyped>& list) {
        std::vector<PatchTitleString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<PatchTitleTyped> from_string_list(const std::vector<PatchTitleString>& list) {
        std::vector<PatchTitleTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("title", json::Convert<std::string>::to_json(title));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static PatchTitleTyped from_json_value(const json::Value& v) {
        PatchTitleTyped t;
        t.title = json::Convert<std::string>::from_json(json::require(v, "title"), "title");
        return t;
    }

    static PatchTitleTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<PatchTitleTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<PatchTitleTyped> from_json_list(const std::string& text) {
        std::vector<PatchTitleTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "PatchTitleTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const PatchTitleTyped& o) const {
        return title == o.title;
    }
    bool operator!=(const PatchTitleTyped& o) const { return !(*this == o); }
};
