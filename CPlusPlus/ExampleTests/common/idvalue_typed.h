#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "idvalue_string.h"
#include "idform_typed.h"

struct IDValueTyped {
    IDFormTyped id;
    int value = 0;

    static IDValueTyped from_string_struct(const IDValueString& s) {
        IDValueTyped t;
        t.id = IDFormTyped::from_string_struct(s.id);
        t.value = !s.value.empty() ? std::stoi(s.value) : 0;
        return t;
    }

    IDValueString to_string_struct() const {
        IDValueString s;
        s.id = id.to_string_struct();
        s.value = std::to_string(value);
        return s;
    }

    static std::vector<IDValueString> to_string_list(const std::vector<IDValueTyped>& list) {
        std::vector<IDValueString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<IDValueTyped> from_string_list(const std::vector<IDValueString>& list) {
        std::vector<IDValueTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("ID", id.to_json_value());
        m.emplace_back("Value", json::Convert<int>::to_json(value));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static IDValueTyped from_json_value(const json::Value& v) {
        IDValueTyped t;
        t.id = IDFormTyped::from_json_value(json::require(v, "ID"));
        t.value = json::Convert<int>::from_json(json::require(v, "Value"), "Value");
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

    bool operator==(const IDValueTyped& o) const {
        return id == o.id
            && value == o.value;
    }
    bool operator!=(const IDValueTyped& o) const { return !(*this == o); }
};
