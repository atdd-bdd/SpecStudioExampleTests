#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "validvalues_string.h"

struct ValidValuesTyped {
    std::string value;
    bool isvalid = false;
    std::string notes;

    static ValidValuesTyped from_string_struct(const ValidValuesString& s) {
        ValidValuesTyped t;
        t.value = s.value;
        t.isvalid = parse_bool_cell(s.isvalid);
        t.notes = s.notes;
        return t;
    }

    ValidValuesString to_string_struct() const {
        ValidValuesString s;
        s.value = value;
        s.isvalid = (isvalid ? "true" : "false");
        s.notes = notes;
        return s;
    }

    static std::vector<ValidValuesString> to_string_list(const std::vector<ValidValuesTyped>& list) {
        std::vector<ValidValuesString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ValidValuesTyped> from_string_list(const std::vector<ValidValuesString>& list) {
        std::vector<ValidValuesTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Value", json::Convert<std::string>::to_json(value));
        m.emplace_back("IsValid", json::Convert<bool>::to_json(isvalid));
        m.emplace_back("Notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ValidValuesTyped from_json_value(const json::Value& v) {
        ValidValuesTyped t;
        t.value = json::Convert<std::string>::from_json(json::require(v, "Value"), "Value");
        t.isvalid = json::Convert<bool>::from_json(json::require(v, "IsValid"), "IsValid");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "Notes"), "Notes");
        return t;
    }

    static ValidValuesTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ValidValuesTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ValidValuesTyped> from_json_list(const std::string& text) {
        std::vector<ValidValuesTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ValidValuesTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ValidValuesTyped& o) const {
        return value == o.value
            && isvalid == o.isvalid
            && notes == o.notes;
    }
    bool operator!=(const ValidValuesTyped& o) const { return !(*this == o); }
};
