#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "address_string.h"

struct AddressTyped {
    SimpleText street;
    SimpleText city;
    SimpleText state;
    SimpleText zip;

    static AddressTyped from_string_struct(const AddressString& s) {
        AddressTyped t;
        t.street = SimpleText(s.street);
        t.city = SimpleText(s.city);
        t.state = SimpleText(s.state);
        t.zip = SimpleText(s.zip);
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("street", json::Convert<SimpleText>::to_json(street));
        m.emplace_back("city", json::Convert<SimpleText>::to_json(city));
        m.emplace_back("state", json::Convert<SimpleText>::to_json(state));
        m.emplace_back("zip", json::Convert<SimpleText>::to_json(zip));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static AddressTyped from_json_value(const json::Value& v) {
        AddressTyped t;
        t.street = json::Convert<SimpleText>::from_json(json::require(v, "street"), "street");
        t.city = json::Convert<SimpleText>::from_json(json::require(v, "city"), "city");
        t.state = json::Convert<SimpleText>::from_json(json::require(v, "state"), "state");
        t.zip = json::Convert<SimpleText>::from_json(json::require(v, "zip"), "zip");
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
};
