#pragma once
// The typed form of the DataType Score: the production class, built
// from the cell's text. This is the only place common reaches into
// production, and it is here so that reading a value happens in the glue.

#include <optional>
#include <stdexcept>
#include <string>
#include <vector>
#include "json.h"
#include "score_string.h"
#include "../production/Score.h"

struct ScoreTyped {
    // Empty when the cell was blank or held the do-not-care marker:
    // neither states a value, so the type is not asked to read one.
    std::optional<::Score> value;
    // The text it was read from. Comparing and writing back use this, so
    // neither needs anything of the production class.
    std::string text;

    static ScoreTyped from_string_struct(const ScoreString& s) {
        ScoreTyped t;
        t.text = s.value;
        if (s.value.empty() || s.value == DNCString) return t;
        // The production class decides what it accepts, and a refusal is
        // its own exception, thrown here -- inside the glue's call.
        t.value.emplace(s.value);
        return t;
    }

    ScoreString to_string_struct() const { return ScoreString(text); }

    // The value itself. A blank cell has none, which has_value() answers.
    bool has_value() const { return value.has_value(); }
    const ::Score& get() const { return value.value(); }

    static std::vector<ScoreString> to_string_list(const std::vector<ScoreTyped>& list) {
        std::vector<ScoreString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ScoreTyped> from_string_list(const std::vector<ScoreString>& list) {
        std::vector<ScoreTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const { return json::Convert<std::string>::to_json(text); }
    std::string to_json() const { return json::write(to_json_value()); }
    static ScoreTyped from_json_value(const json::Value& v) {
        return from_string_struct(ScoreString(json::Convert<std::string>::from_json(v, "Score")));
    }
    static ScoreTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    bool operator==(const ScoreTyped& o) const { return dnc_equal(text, o.text); }
    bool operator!=(const ScoreTyped& o) const { return !(*this == o); }
};
