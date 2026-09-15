#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "addresscomponents_string.h"

struct AddressComponentsTyped {
    std::string zip;
    std::string streetname;
    std::string city;
    std::string predirection;
    std::string suffixdirection;
    std::string state;
    std::string suffixtype;

    static AddressComponentsTyped from_string_struct(const AddressComponentsString& s) {
        AddressComponentsTyped t;
        t.zip = s.zip;
        t.streetname = s.streetname;
        t.city = s.city;
        t.predirection = s.predirection;
        t.suffixdirection = s.suffixdirection;
        t.state = s.state;
        t.suffixtype = s.suffixtype;
        return t;
    }

    AddressComponentsString to_string_struct() const {
        AddressComponentsString s;
        s.zip = zip;
        s.streetname = streetname;
        s.city = city;
        s.predirection = predirection;
        s.suffixdirection = suffixdirection;
        s.state = state;
        s.suffixtype = suffixtype;
        return s;
    }

    static std::vector<AddressComponentsString> to_string_list(const std::vector<AddressComponentsTyped>& list) {
        std::vector<AddressComponentsString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<AddressComponentsTyped> from_string_list(const std::vector<AddressComponentsString>& list) {
        std::vector<AddressComponentsTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("zip", json::Convert<std::string>::to_json(zip));
        m.emplace_back("streetName", json::Convert<std::string>::to_json(streetname));
        m.emplace_back("city", json::Convert<std::string>::to_json(city));
        m.emplace_back("preDirection", json::Convert<std::string>::to_json(predirection));
        m.emplace_back("suffixDirection", json::Convert<std::string>::to_json(suffixdirection));
        m.emplace_back("state", json::Convert<std::string>::to_json(state));
        m.emplace_back("suffixType", json::Convert<std::string>::to_json(suffixtype));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static AddressComponentsTyped from_json_value(const json::Value& v) {
        AddressComponentsTyped t;
        t.zip = json::Convert<std::string>::from_json(json::require(v, "zip"), "zip");
        t.streetname = json::Convert<std::string>::from_json(json::require(v, "streetName"), "streetName");
        t.city = json::Convert<std::string>::from_json(json::require(v, "city"), "city");
        t.predirection = json::Convert<std::string>::from_json(json::require(v, "preDirection"), "preDirection");
        t.suffixdirection = json::Convert<std::string>::from_json(json::require(v, "suffixDirection"), "suffixDirection");
        t.state = json::Convert<std::string>::from_json(json::require(v, "state"), "state");
        t.suffixtype = json::Convert<std::string>::from_json(json::require(v, "suffixType"), "suffixType");
        return t;
    }

    static AddressComponentsTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<AddressComponentsTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<AddressComponentsTyped> from_json_list(const std::string& text) {
        std::vector<AddressComponentsTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "AddressComponentsTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const AddressComponentsTyped& o) const {
        return zip == o.zip
            && streetname == o.streetname
            && city == o.city
            && predirection == o.predirection
            && suffixdirection == o.suffixdirection
            && state == o.state
            && suffixtype == o.suffixtype;
    }
    bool operator!=(const AddressComponentsTyped& o) const { return !(*this == o); }
};
