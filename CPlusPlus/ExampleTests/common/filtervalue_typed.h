#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "filtervalue_string.h"
#include "idform_typed.h"

struct FilterValueTyped {
    IDFormTyped value;

    static FilterValueTyped from_string_struct(const FilterValueString& s) {
        FilterValueTyped t;
        t.value = IDFormTyped::from_string_struct(s.value);
        return t;
    }

    FilterValueString to_string_struct() const {
        FilterValueString s;
        s.value = value.to_string_struct();
        return s;
    }

    static std::vector<FilterValueString> to_string_list(const std::vector<FilterValueTyped>& list) {
        std::vector<FilterValueString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<FilterValueTyped> from_string_list(const std::vector<FilterValueString>& list) {
        std::vector<FilterValueTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Value", value.to_json_value());
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static FilterValueTyped from_json_value(const json::Value& v) {
        FilterValueTyped t;
        t.value = IDFormTyped::from_json_value(json::require(v, "Value"));
        return t;
    }

    static FilterValueTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<FilterValueTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<FilterValueTyped> from_json_list(const std::string& text) {
        std::vector<FilterValueTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "FilterValueTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const FilterValueTyped& o) const {
        return value == o.value;
    }
    bool operator!=(const FilterValueTyped& o) const { return !(*this == o); }
};
