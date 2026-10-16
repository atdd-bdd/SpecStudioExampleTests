#pragma once
// The typed form of the DataType Pins: the production class, built
// from the cell's text. This is the only place common reaches into
// production, and it is here so that reading a value happens in the glue.

#include <optional>
#include <stdexcept>
#include <string>
#include <vector>
#include "json.h"
#include "pins_string.h"
#include "../production/Pins.h"

struct PinsTyped {
    // Empty when the cell was blank or held the do-not-care marker:
    // neither states a value, so the type is not asked to read one.
    std::optional<::Pins> value;
    // The text it was read from. Comparing and writing back use this, so
    // neither needs anything of the production class.
    std::string text;

    static PinsTyped from_string_struct(const PinsString& s) {
        PinsTyped t;
        t.text = s.value;
        if (s.value.empty() || s.value == DNCString) return t;
        // The production class decides what it accepts, and a refusal is
        // its own exception, thrown here -- inside the glue's call.
        t.value.emplace(s.value);
        return t;
    }

    PinsString to_string_struct() const { return PinsString(text); }

    // The value itself. A blank cell has none, which has_value() answers.
    bool has_value() const { return value.has_value(); }
    const ::Pins& get() const { return value.value(); }

    static std::vector<PinsString> to_string_list(const std::vector<PinsTyped>& list) {
        std::vector<PinsString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<PinsTyped> from_string_list(const std::vector<PinsString>& list) {
        std::vector<PinsTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const { return json::Convert<std::string>::to_json(text); }
    std::string to_json() const { return json::write(to_json_value()); }
    static PinsTyped from_json_value(const json::Value& v) {
        return from_string_struct(PinsString(json::Convert<std::string>::from_json(v, "Pins")));
    }
    static PinsTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    bool operator==(const PinsTyped& o) const { return dnc_equal(text, o.text); }
    bool operator!=(const PinsTyped& o) const { return !(*this == o); }
};
