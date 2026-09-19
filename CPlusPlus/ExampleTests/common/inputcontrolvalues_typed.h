#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "inputcontrolvalues_string.h"

struct InputControlValuesTyped {
    int frame = 0;
    std::string roll;
    std::string remaining;

    static InputControlValuesTyped from_string_struct(const InputControlValuesString& s) {
        InputControlValuesTyped t;
        t.frame = !s.frame.empty() ? std::stoi(s.frame) : 0;
        t.roll = s.roll;
        t.remaining = s.remaining;
        return t;
    }

    InputControlValuesString to_string_struct() const {
        InputControlValuesString s;
        s.frame = std::to_string(frame);
        s.roll = roll;
        s.remaining = remaining;
        return s;
    }

    static std::vector<InputControlValuesString> to_string_list(const std::vector<InputControlValuesTyped>& list) {
        std::vector<InputControlValuesString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<InputControlValuesTyped> from_string_list(const std::vector<InputControlValuesString>& list) {
        std::vector<InputControlValuesTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Frame", json::Convert<int>::to_json(frame));
        m.emplace_back("Roll", json::Convert<std::string>::to_json(roll));
        m.emplace_back("Remaining", json::Convert<std::string>::to_json(remaining));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static InputControlValuesTyped from_json_value(const json::Value& v) {
        InputControlValuesTyped t;
        t.frame = json::Convert<int>::from_json(json::require(v, "Frame"), "Frame");
        t.roll = json::Convert<std::string>::from_json(json::require(v, "Roll"), "Roll");
        t.remaining = json::Convert<std::string>::from_json(json::require(v, "Remaining"), "Remaining");
        return t;
    }

    static InputControlValuesTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<InputControlValuesTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<InputControlValuesTyped> from_json_list(const std::string& text) {
        std::vector<InputControlValuesTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "InputControlValuesTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const InputControlValuesTyped& o) const {
        return frame == o.frame
            && roll == o.roll
            && remaining == o.remaining;
    }
    bool operator!=(const InputControlValuesTyped& o) const { return !(*this == o); }
};
