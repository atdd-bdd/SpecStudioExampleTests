#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "shoppingcart_string.h"
#include "address_typed.h"

struct ShoppingCartTyped {
    std::string items;
    std::string shipping;
    std::string discount;
    std::string totalprice;
    AddressTyped shippingaddress;
    AddressTyped billingaddress;

    static ShoppingCartTyped from_string_struct(const ShoppingCartString& s) {
        ShoppingCartTyped t;
        t.items = s.items;
        t.shipping = s.shipping;
        t.discount = s.discount;
        t.totalprice = s.totalprice;
        t.shippingaddress = AddressTyped::from_string_struct(s.shippingaddress);
        t.billingaddress = AddressTyped::from_string_struct(s.billingaddress);
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("items", json::Convert<std::string>::to_json(items));
        m.emplace_back("shipping", json::Convert<std::string>::to_json(shipping));
        m.emplace_back("discount", json::Convert<std::string>::to_json(discount));
        m.emplace_back("totalprice", json::Convert<std::string>::to_json(totalprice));
        m.emplace_back("shippingaddress", shippingaddress.to_json_value());
        m.emplace_back("billingaddress", billingaddress.to_json_value());
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ShoppingCartTyped from_json_value(const json::Value& v) {
        ShoppingCartTyped t;
        t.items = json::Convert<std::string>::from_json(json::require(v, "items"), "items");
        t.shipping = json::Convert<std::string>::from_json(json::require(v, "shipping"), "shipping");
        t.discount = json::Convert<std::string>::from_json(json::require(v, "discount"), "discount");
        t.totalprice = json::Convert<std::string>::from_json(json::require(v, "totalprice"), "totalprice");
        t.shippingaddress = AddressTyped::from_json_value(json::require(v, "shippingaddress"));
        t.billingaddress = AddressTyped::from_json_value(json::require(v, "billingaddress"));
        return t;
    }

    static ShoppingCartTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ShoppingCartTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ShoppingCartTyped> from_json_list(const std::string& text) {
        std::vector<ShoppingCartTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ShoppingCartTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ShoppingCartTyped& o) const {
        return items == o.items
            && shipping == o.shipping
            && discount == o.discount
            && totalprice == o.totalprice
            && shippingaddress == o.shippingaddress
            && billingaddress == o.billingaddress;
    }
    bool operator!=(const ShoppingCartTyped& o) const { return !(*this == o); }
};
