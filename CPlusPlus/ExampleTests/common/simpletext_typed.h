#pragma once
// The typed form of the DataType SimpleText: the production class, built
// from the cell's text. This is the only place common reaches into
// production, and it is here so that reading a value happens in the glue.

#include <optional>
#include <stdexcept>
#include <string>
#include <vector>
#include "json.h"
#include "simpletext_string.h"
#include "../production/datatypes.h"

struct SimpleTextTyped {
    // Empty when the cell was blank or held the do-not-care marker:
    // neither states a value, so the type is not asked to read one.
    std::optional<::SimpleText> value;
    // The text it was read from. Comparing and writing back use this, so
    // neither needs anything of the production class.
    std::string text;

    static SimpleTextTyped from_string_struct(const SimpleTextString& s) {
        SimpleTextTyped t;
        t.text = s.value;
        if (s.value.empty() || s.value == DNCString) return t;
        // The production class decides what it accepts, and a refusal is
        // its own exception, thrown here -- inside the glue's call.
        t.value.emplace(s.value);
        return t;
    }

    SimpleTextString to_string_struct() const { return SimpleTextString(text); }

    // The value itself. A blank cell has none, which has_value() answers.
    bool has_value() const { return value.has_value(); }
    const ::SimpleText& get() const { return value.value(); }

    static std::vector<SimpleTextString> to_string_list(const std::vector<SimpleTextTyped>& list) {
        std::vector<SimpleTextString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<SimpleTextTyped> from_string_list(const std::vector<SimpleTextString>& list) {
        std::vector<SimpleTextTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const { return json::Convert<std::string>::to_json(text); }
    std::string to_json() const { return json::write(to_json_value()); }
    static SimpleTextTyped from_json_value(const json::Value& v) {
        return from_string_struct(SimpleTextString(json::Convert<std::string>::from_json(v, "SimpleText")));
    }
    static SimpleTextTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    bool operator==(const SimpleTextTyped& o) const { return dnc_equal(text, o.text); }
    bool operator!=(const SimpleTextTyped& o) const { return !(*this == o); }
};
