#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "apistatus_string.h"

struct ApiStatusTyped {
    int code = 0;

    static ApiStatusTyped from_string_struct(const ApiStatusString& s) {
        ApiStatusTyped t;
        t.code = !s.code.empty() ? std::stoi(s.code) : 0;
        return t;
    }

    ApiStatusString to_string_struct() const {
        ApiStatusString s;
        s.code = std::to_string(code);
        return s;
    }

    static std::vector<ApiStatusString> to_string_list(const std::vector<ApiStatusTyped>& list) {
        std::vector<ApiStatusString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ApiStatusTyped> from_string_list(const std::vector<ApiStatusString>& list) {
        std::vector<ApiStatusTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Code", json::Convert<int>::to_json(code));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ApiStatusTyped from_json_value(const json::Value& v) {
        ApiStatusTyped t;
        t.code = json::Convert<int>::from_json(json::require(v, "Code"), "Code");
        return t;
    }

    static ApiStatusTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ApiStatusTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ApiStatusTyped> from_json_list(const std::string& text) {
        std::vector<ApiStatusTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ApiStatusTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ApiStatusTyped& o) const {
        return code == o.code;
    }
    bool operator!=(const ApiStatusTyped& o) const { return !(*this == o); }
};
