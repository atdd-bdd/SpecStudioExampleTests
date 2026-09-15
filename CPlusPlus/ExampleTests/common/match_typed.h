#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "match_string.h"
#include "addresscomponents_typed.h"

struct MatchTyped {
    std::string matchedaddress;
    AddressComponentsTyped addresscomponents;

    static MatchTyped from_string_struct(const MatchString& s) {
        MatchTyped t;
        t.matchedaddress = s.matchedaddress;
        t.addresscomponents = AddressComponentsTyped::from_string_struct(s.addresscomponents);
        return t;
    }

    MatchString to_string_struct() const {
        MatchString s;
        s.matchedaddress = matchedaddress;
        s.addresscomponents = addresscomponents.to_string_struct();
        return s;
    }

    static std::vector<MatchString> to_string_list(const std::vector<MatchTyped>& list) {
        std::vector<MatchString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<MatchTyped> from_string_list(const std::vector<MatchString>& list) {
        std::vector<MatchTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("matchedAddress", json::Convert<std::string>::to_json(matchedaddress));
        m.emplace_back("addressComponents", addresscomponents.to_json_value());
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static MatchTyped from_json_value(const json::Value& v) {
        MatchTyped t;
        t.matchedaddress = json::Convert<std::string>::from_json(json::require(v, "matchedAddress"), "matchedAddress");
        t.addresscomponents = AddressComponentsTyped::from_json_value(json::require(v, "addressComponents"));
        return t;
    }

    static MatchTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<MatchTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<MatchTyped> from_json_list(const std::string& text) {
        std::vector<MatchTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "MatchTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const MatchTyped& o) const {
        return matchedaddress == o.matchedaddress
            && addresscomponents == o.addresscomponents;
    }
    bool operator!=(const MatchTyped& o) const { return !(*this == o); }
};
