#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "cartinput_string.h"
#include "dollar_typed.h"

struct CartInputTyped {
    DollarTyped totalitems;
    DollarTyped shipping;
    DollarTyped discount;
    DollarTyped total_price;
    std::string notes;

    static CartInputTyped from_string_struct(const CartInputString& s) {
        CartInputTyped t;
        t.totalitems = DollarTyped::from_string_struct(s.totalitems);
        t.shipping = DollarTyped::from_string_struct(s.shipping);
        t.discount = DollarTyped::from_string_struct(s.discount);
        t.total_price = DollarTyped::from_string_struct(s.total_price);
        t.notes = s.notes;
        return t;
    }

    CartInputString to_string_struct() const {
        CartInputString s;
        s.totalitems = totalitems.to_string_struct();
        s.shipping = shipping.to_string_struct();
        s.discount = discount.to_string_struct();
        s.total_price = total_price.to_string_struct();
        s.notes = notes;
        return s;
    }

    static std::vector<CartInputString> to_string_list(const std::vector<CartInputTyped>& list) {
        std::vector<CartInputString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<CartInputTyped> from_string_list(const std::vector<CartInputString>& list) {
        std::vector<CartInputTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("TotalItems", totalitems.to_json_value());
        m.emplace_back("Shipping", shipping.to_json_value());
        m.emplace_back("Discount", discount.to_json_value());
        m.emplace_back("Total Price", total_price.to_json_value());
        m.emplace_back("Notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static CartInputTyped from_json_value(const json::Value& v) {
        CartInputTyped t;
        t.totalitems = DollarTyped::from_json_value(json::require(v, "TotalItems"));
        t.shipping = DollarTyped::from_json_value(json::require(v, "Shipping"));
        t.discount = DollarTyped::from_json_value(json::require(v, "Discount"));
        t.total_price = DollarTyped::from_json_value(json::require(v, "Total Price"));
        t.notes = json::Convert<std::string>::from_json(json::require(v, "Notes"), "Notes");
        return t;
    }

    static CartInputTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<CartInputTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<CartInputTyped> from_json_list(const std::string& text) {
        std::vector<CartInputTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "CartInputTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const CartInputTyped& o) const {
        return totalitems == o.totalitems
            && shipping == o.shipping
            && discount == o.discount
            && total_price == o.total_price
            && notes == o.notes;
    }
    bool operator!=(const CartInputTyped& o) const { return !(*this == o); }
};
