#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "resultvalue_string.h"

struct ResultValueTyped {
    int sum = 0;

    static ResultValueTyped from_string_struct(const ResultValueString& s) {
        ResultValueTyped t;
        t.sum = !s.sum.empty() ? std::stoi(s.sum) : 0;
        return t;
    }

    ResultValueString to_string_struct() const {
        ResultValueString s;
        s.sum = std::to_string(sum);
        return s;
    }

    static std::vector<ResultValueString> to_string_list(const std::vector<ResultValueTyped>& list) {
        std::vector<ResultValueString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ResultValueTyped> from_string_list(const std::vector<ResultValueString>& list) {
        std::vector<ResultValueTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Sum", json::Convert<int>::to_json(sum));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ResultValueTyped from_json_value(const json::Value& v) {
        ResultValueTyped t;
        t.sum = json::Convert<int>::from_json(json::require(v, "Sum"), "Sum");
        return t;
    }

    static ResultValueTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ResultValueTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ResultValueTyped> from_json_list(const std::string& text) {
        std::vector<ResultValueTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ResultValueTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ResultValueTyped& o) const {
        return sum == o.sum;
    }
    bool operator!=(const ResultValueTyped& o) const { return !(*this == o); }
};
