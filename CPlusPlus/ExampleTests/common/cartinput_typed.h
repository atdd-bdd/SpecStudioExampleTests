#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "cartinput_string.h"

struct CartInputTyped {
    std::string totalitems;
    std::string shipping;
    std::string discount;
    std::string total_price;
    std::string notes;

    static CartInputTyped from_string_struct(const CartInputString& s) {
        CartInputTyped t;
        t.totalitems = s.totalitems;
        t.shipping = s.shipping;
        t.discount = s.discount;
        t.total_price = s.total_price;
        t.notes = s.notes;
        return t;
    }

    CartInputString to_string_struct() const {
        CartInputString s;
        s.totalitems = totalitems;
        s.shipping = shipping;
        s.discount = discount;
        s.total_price = total_price;
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
        m.emplace_back("TotalItems", json::Convert<std::string>::to_json(totalitems));
        m.emplace_back("Shipping", json::Convert<std::string>::to_json(shipping));
        m.emplace_back("Discount", json::Convert<std::string>::to_json(discount));
        m.emplace_back("Total Price", json::Convert<std::string>::to_json(total_price));
        m.emplace_back("Notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static CartInputTyped from_json_value(const json::Value& v) {
        CartInputTyped t;
        t.totalitems = json::Convert<std::string>::from_json(json::require(v, "TotalItems"), "TotalItems");
        t.shipping = json::Convert<std::string>::from_json(json::require(v, "Shipping"), "Shipping");
        t.discount = json::Convert<std::string>::from_json(json::require(v, "Discount"), "Discount");
        t.total_price = json::Convert<std::string>::from_json(json::require(v, "Total Price"), "Total Price");
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
