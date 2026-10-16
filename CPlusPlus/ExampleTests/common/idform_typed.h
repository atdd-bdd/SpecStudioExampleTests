#pragma once
// The typed form of the DataType IDForm: the production class, built
// from the cell's text. This is the only place common reaches into
// production, and it is here so that reading a value happens in the glue.

#include <optional>
#include <stdexcept>
#include <string>
#include <vector>
#include "json.h"
#include "idform_string.h"
#include "../production/datatypes.h"

struct IDFormTyped {
    // Empty when the cell was blank or held the do-not-care marker:
    // neither states a value, so the type is not asked to read one.
    std::optional<::IDForm> value;
    // The text it was read from. Comparing and writing back use this, so
    // neither needs anything of the production class.
    std::string text;

    static IDFormTyped from_string_struct(const IDFormString& s) {
        IDFormTyped t;
        t.text = s.value;
        if (s.value.empty() || s.value == DNCString) return t;
        // The production class decides what it accepts, and a refusal is
        // its own exception, thrown here -- inside the glue's call.
        t.value.emplace(s.value);
        return t;
    }

    IDFormString to_string_struct() const { return IDFormString(text); }

    // The value itself. A blank cell has none, which has_value() answers.
    bool has_value() const { return value.has_value(); }
    const ::IDForm& get() const { return value.value(); }

    static std::vector<IDFormString> to_string_list(const std::vector<IDFormTyped>& list) {
        std::vector<IDFormString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<IDFormTyped> from_string_list(const std::vector<IDFormString>& list) {
        std::vector<IDFormTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const { return json::Convert<std::string>::to_json(text); }
    std::string to_json() const { return json::write(to_json_value()); }
    static IDFormTyped from_json_value(const json::Value& v) {
        return from_string_struct(IDFormString(json::Convert<std::string>::from_json(v, "IDForm")));
    }
    static IDFormTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    bool operator==(const IDFormTyped& o) const { return dnc_equal(text, o.text); }
    bool operator!=(const IDFormTyped& o) const { return !(*this == o); }
};
