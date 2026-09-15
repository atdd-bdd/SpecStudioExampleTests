#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "address_string.h"

struct AddressTyped {
    std::string street;
    std::string city;
    std::string state;
    std::string zip;

    static AddressTyped from_string_struct(const AddressString& s) {
        AddressTyped t;
        t.street = s.street;
        t.city = s.city;
        t.state = s.state;
        t.zip = s.zip;
        return t;
    }

    AddressString to_string_struct() const {
        AddressString s;
        s.street = street;
        s.city = city;
        s.state = state;
        s.zip = zip;
        return s;
    }

    static std::vector<AddressString> to_string_list(const std::vector<AddressTyped>& list) {
        std::vector<AddressString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<AddressTyped> from_string_list(const std::vector<AddressString>& list) {
        std::vector<AddressTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Street", json::Convert<std::string>::to_json(street));
        m.emplace_back("City", json::Convert<std::string>::to_json(city));
        m.emplace_back("State", json::Convert<std::string>::to_json(state));
        m.emplace_back("ZIP", json::Convert<std::string>::to_json(zip));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static AddressTyped from_json_value(const json::Value& v) {
        AddressTyped t;
        t.street = json::Convert<std::string>::from_json(json::require(v, "Street"), "Street");
        t.city = json::Convert<std::string>::from_json(json::require(v, "City"), "City");
        t.state = json::Convert<std::string>::from_json(json::require(v, "State"), "State");
        t.zip = json::Convert<std::string>::from_json(json::require(v, "ZIP"), "ZIP");
        return t;
    }

    static AddressTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<AddressTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<AddressTyped> from_json_list(const std::string& text) {
        std::vector<AddressTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "AddressTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const AddressTyped& o) const {
        return street == o.street
            && city == o.city
            && state == o.state
            && zip == o.zip;
    }
    bool operator!=(const AddressTyped& o) const { return !(*this == o); }
};
