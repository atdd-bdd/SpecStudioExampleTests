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
        t.isvalid = (s.isvalid == "true" || s.isvalid == "t" || s.isvalid == "yes" || s.isvalid == "y" || s.isvalid == "1");
        t.notes = s.notes;
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("value", json::Convert<std::string>::to_json(value));
        m.emplace_back("isvalid", json::Convert<bool>::to_json(isvalid));
        m.emplace_back("notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ValidValuesTyped from_json_value(const json::Value& v) {
        ValidValuesTyped t;
        t.value = json::Convert<std::string>::from_json(json::require(v, "value"), "value");
        t.isvalid = json::Convert<bool>::from_json(json::require(v, "isvalid"), "isvalid");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "notes"), "notes");
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
};
