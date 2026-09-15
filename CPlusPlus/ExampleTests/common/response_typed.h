#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "response_string.h"
#include "result_typed.h"

struct ResponseTyped {
    ResultTyped result;

    static ResponseTyped from_string_struct(const ResponseString& s) {
        ResponseTyped t;
        t.result = ResultTyped::from_string_struct(s.result);
        return t;
    }

    ResponseString to_string_struct() const {
        ResponseString s;
        s.result = result.to_string_struct();
        return s;
    }

    static std::vector<ResponseString> to_string_list(const std::vector<ResponseTyped>& list) {
        std::vector<ResponseString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ResponseTyped> from_string_list(const std::vector<ResponseString>& list) {
        std::vector<ResponseTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("result", result.to_json_value());
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ResponseTyped from_json_value(const json::Value& v) {
        ResponseTyped t;
        t.result = ResultTyped::from_json_value(json::require(v, "result"));
        return t;
    }

    static ResponseTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ResponseTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ResponseTyped> from_json_list(const std::string& text) {
        std::vector<ResponseTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ResponseTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ResponseTyped& o) const {
        return result == o.result;
    }
    bool operator!=(const ResponseTyped& o) const { return !(*this == o); }
};
