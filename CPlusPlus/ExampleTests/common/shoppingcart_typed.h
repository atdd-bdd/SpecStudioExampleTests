#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "shoppingcart_string.h"
#include "orderitem_typed.h"
#include "address_typed.h"

struct ShoppingCartTyped {
    std::vector<OrderItemTyped> items;
    std::string shipping;
    std::string discount;
    std::string totalprice;
    AddressTyped shippingaddress;
    AddressTyped billingaddress;

    static ShoppingCartTyped from_string_struct(const ShoppingCartString& s) {
        ShoppingCartTyped t;
        t.shipping = s.shipping;
        t.discount = s.discount;
        t.totalprice = s.totalprice;
        t.shippingaddress = AddressTyped::from_string_struct(s.shippingaddress);
        t.billingaddress = AddressTyped::from_string_struct(s.billingaddress);
        return t;
    }

    ShoppingCartString to_string_struct() const {
        ShoppingCartString s;
        s.shipping = shipping;
        s.discount = discount;
        s.totalprice = totalprice;
        s.shippingaddress = shippingaddress.to_string_struct();
        s.billingaddress = billingaddress.to_string_struct();
        return s;
    }

    static std::vector<ShoppingCartString> to_string_list(const std::vector<ShoppingCartTyped>& list) {
        std::vector<ShoppingCartString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ShoppingCartTyped> from_string_list(const std::vector<ShoppingCartString>& list) {
        std::vector<ShoppingCartTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        {
            json::Elements e_items;
            for (const auto& item : items) e_items.push_back(item.to_json_value());
            m.emplace_back("Items", json::Value::make_array(std::move(e_items)));
        }
        m.emplace_back("Shipping", json::Convert<std::string>::to_json(shipping));
        m.emplace_back("Discount", json::Convert<std::string>::to_json(discount));
        m.emplace_back("TotalPrice", json::Convert<std::string>::to_json(totalprice));
        m.emplace_back("ShippingAddress", shippingaddress.to_json_value());
        m.emplace_back("BillingAddress", billingaddress.to_json_value());
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ShoppingCartTyped from_json_value(const json::Value& v) {
        ShoppingCartTyped t;
        for (const auto& e : json::require(v, "Items").elements())
            t.items.push_back(OrderItemTyped::from_json_value(e));
        t.shipping = json::Convert<std::string>::from_json(json::require(v, "Shipping"), "Shipping");
        t.discount = json::Convert<std::string>::from_json(json::require(v, "Discount"), "Discount");
        t.totalprice = json::Convert<std::string>::from_json(json::require(v, "TotalPrice"), "TotalPrice");
        t.shippingaddress = AddressTyped::from_json_value(json::require(v, "ShippingAddress"));
        t.billingaddress = AddressTyped::from_json_value(json::require(v, "BillingAddress"));
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
