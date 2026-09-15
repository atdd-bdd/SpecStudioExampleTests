#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "shippinginput_string.h"

struct ShippingInputTyped {
    std::string total_price;
    std::string shipping_cost;
    std::string notes;

    static ShippingInputTyped from_string_struct(const ShippingInputString& s) {
        ShippingInputTyped t;
        t.total_price = s.total_price;
        t.shipping_cost = s.shipping_cost;
        t.notes = s.notes;
        return t;
    }

    ShippingInputString to_string_struct() const {
        ShippingInputString s;
        s.total_price = total_price;
        s.shipping_cost = shipping_cost;
        s.notes = notes;
        return s;
    }

    static std::vector<ShippingInputString> to_string_list(const std::vector<ShippingInputTyped>& list) {
        std::vector<ShippingInputString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ShippingInputTyped> from_string_list(const std::vector<ShippingInputString>& list) {
        std::vector<ShippingInputTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Total Price", json::Convert<std::string>::to_json(total_price));
        m.emplace_back("Shipping Cost", json::Convert<std::string>::to_json(shipping_cost));
        m.emplace_back("Notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ShippingInputTyped from_json_value(const json::Value& v) {
        ShippingInputTyped t;
        t.total_price = json::Convert<std::string>::from_json(json::require(v, "Total Price"), "Total Price");
        t.shipping_cost = json::Convert<std::string>::from_json(json::require(v, "Shipping Cost"), "Shipping Cost");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "Notes"), "Notes");
        return t;
    }

    static ShippingInputTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ShippingInputTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ShippingInputTyped> from_json_list(const std::string& text) {
        std::vector<ShippingInputTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ShippingInputTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ShippingInputTyped& o) const {
        return total_price == o.total_price
            && shipping_cost == o.shipping_cost
            && notes == o.notes;
    }
    bool operator!=(const ShippingInputTyped& o) const { return !(*this == o); }
};
