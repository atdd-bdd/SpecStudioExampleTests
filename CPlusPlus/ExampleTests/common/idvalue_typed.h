#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "idvalue_string.h"

struct IDValueTyped {
    IDForm id;
    int value = 0;

    static IDValueTyped from_string_struct(const IDValueString& s) {
        IDValueTyped t;
        t.id = IDForm(s.id);
        t.value = !s.value.empty() ? std::stoi(s.value) : 0;
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("id", json::Convert<IDForm>::to_json(id));
        m.emplace_back("value", json::Convert<int>::to_json(value));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static IDValueTyped from_json_value(const json::Value& v) {
        IDValueTyped t;
        t.id = json::Convert<IDForm>::from_json(json::require(v, "id"), "id");
        t.value = json::Convert<int>::from_json(json::require(v, "value"), "value");
        return t;
    }

    static IDValueTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<IDValueTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<IDValueTyped> from_json_list(const std::string& text) {
        std::vector<IDValueTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "IDValueTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }
};
