#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "result_string.h"
#include "match_typed.h"

struct ResultTyped {
    std::vector<MatchTyped> addressmatches;

    static ResultTyped from_string_struct(const ResultString& s) {
        ResultTyped t;
        return t;
    }

    ResultString to_string_struct() const {
        ResultString s;
        return s;
    }

    static std::vector<ResultString> to_string_list(const std::vector<ResultTyped>& list) {
        std::vector<ResultString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ResultTyped> from_string_list(const std::vector<ResultString>& list) {
        std::vector<ResultTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        {
            json::Elements e_addressmatches;
            for (const auto& item : addressmatches) e_addressmatches.push_back(item.to_json_value());
            m.emplace_back("addressMatches", json::Value::make_array(std::move(e_addressmatches)));
        }
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ResultTyped from_json_value(const json::Value& v) {
        ResultTyped t;
        for (const auto& e : json::require(v, "addressMatches").elements())
            t.addressmatches.push_back(MatchTyped::from_json_value(e));
        return t;
    }

    static ResultTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ResultTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ResultTyped> from_json_list(const std::string& text) {
        std::vector<ResultTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ResultTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ResultTyped& o) const {
        return addressmatches == o.addressmatches;
    }
    bool operator!=(const ResultTyped& o) const { return !(*this == o); }
};
