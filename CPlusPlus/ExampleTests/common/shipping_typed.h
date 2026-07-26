#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "shipping_string.h"

struct ShippingTyped {
    Dollar total_price;
    Dollar shipping_cost;
    std::string notes;

    static ShippingTyped from_string_struct(const ShippingString& s) {
        ShippingTyped t;
        t.total_price = Dollar(s.total_price);
        t.shipping_cost = Dollar(s.shipping_cost);
        t.notes = s.notes;
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("total_price", json::Convert<Dollar>::to_json(total_price));
        m.emplace_back("shipping_cost", json::Convert<Dollar>::to_json(shipping_cost));
        m.emplace_back("notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ShippingTyped from_json_value(const json::Value& v) {
        ShippingTyped t;
        t.total_price = json::Convert<Dollar>::from_json(json::require(v, "total_price"), "total_price");
        t.shipping_cost = json::Convert<Dollar>::from_json(json::require(v, "shipping_cost"), "shipping_cost");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "notes"), "notes");
        return t;
    }

    static ShippingTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ShippingTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ShippingTyped> from_json_list(const std::string& text) {
        std::vector<ShippingTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ShippingTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }
};
