#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "status_string.h"

struct StatusTyped {
    int code = 0;

    static StatusTyped from_string_struct(const StatusString& s) {
        StatusTyped t;
        t.code = !s.code.empty() ? std::stoi(s.code) : 0;
        return t;
    }

    StatusString to_string_struct() const {
        StatusString s;
        s.code = std::to_string(code);
        return s;
    }

    static std::vector<StatusString> to_string_list(const std::vector<StatusTyped>& list) {
        std::vector<StatusString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<StatusTyped> from_string_list(const std::vector<StatusString>& list) {
        std::vector<StatusTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Code", json::Convert<int>::to_json(code));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static StatusTyped from_json_value(const json::Value& v) {
        StatusTyped t;
        t.code = json::Convert<int>::from_json(json::require(v, "Code"), "Code");
        return t;
    }

    static StatusTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<StatusTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<StatusTyped> from_json_list(const std::string& text) {
        std::vector<StatusTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "StatusTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const StatusTyped& o) const {
        return code == o.code;
    }
    bool operator!=(const StatusTyped& o) const { return !(*this == o); }
};
