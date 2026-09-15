#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "adder_string.h"

struct AdderTyped {
    int number1 = 0;
    int number2 = 0;
    int result = 0;

    static AdderTyped from_string_struct(const AdderString& s) {
        AdderTyped t;
        t.number1 = !s.number1.empty() ? std::stoi(s.number1) : 0;
        t.number2 = !s.number2.empty() ? std::stoi(s.number2) : 0;
        t.result = !s.result.empty() ? std::stoi(s.result) : 0;
        return t;
    }

    AdderString to_string_struct() const {
        AdderString s;
        s.number1 = std::to_string(number1);
        s.number2 = std::to_string(number2);
        s.result = std::to_string(result);
        return s;
    }

    static std::vector<AdderString> to_string_list(const std::vector<AdderTyped>& list) {
        std::vector<AdderString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<AdderTyped> from_string_list(const std::vector<AdderString>& list) {
        std::vector<AdderTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("number1", json::Convert<int>::to_json(number1));
        m.emplace_back("number2", json::Convert<int>::to_json(number2));
        m.emplace_back("result", json::Convert<int>::to_json(result));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static AdderTyped from_json_value(const json::Value& v) {
        AdderTyped t;
        t.number1 = json::Convert<int>::from_json(json::require(v, "number1"), "number1");
        t.number2 = json::Convert<int>::from_json(json::require(v, "number2"), "number2");
        t.result = json::Convert<int>::from_json(json::require(v, "result"), "result");
        return t;
    }

    static AdderTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<AdderTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<AdderTyped> from_json_list(const std::string& text) {
        std::vector<AdderTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "AdderTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const AdderTyped& o) const {
        return number1 == o.number1
            && number2 == o.number2
            && result == o.result;
    }
    bool operator!=(const AdderTyped& o) const { return !(*this == o); }
};
