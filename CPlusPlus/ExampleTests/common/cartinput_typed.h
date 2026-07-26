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

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("totalitems", json::Convert<std::string>::to_json(totalitems));
        m.emplace_back("shipping", json::Convert<std::string>::to_json(shipping));
        m.emplace_back("discount", json::Convert<std::string>::to_json(discount));
        m.emplace_back("total_price", json::Convert<std::string>::to_json(total_price));
        m.emplace_back("notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static CartInputTyped from_json_value(const json::Value& v) {
        CartInputTyped t;
        t.totalitems = json::Convert<std::string>::from_json(json::require(v, "totalitems"), "totalitems");
        t.shipping = json::Convert<std::string>::from_json(json::require(v, "shipping"), "shipping");
        t.discount = json::Convert<std::string>::from_json(json::require(v, "discount"), "discount");
        t.total_price = json::Convert<std::string>::from_json(json::require(v, "total_price"), "total_price");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "notes"), "notes");
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
