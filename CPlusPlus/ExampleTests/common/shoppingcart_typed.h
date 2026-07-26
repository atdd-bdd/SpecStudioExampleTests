#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "shoppingcart_string.h"

struct ShoppingCartTyped {
    OrderItemCollection items;
    Dollar shipping;
    Dollar discount;
    Dollar totalprice;
    Address shippingaddress;
    Address billingaddress;

    static ShoppingCartTyped from_string_struct(const ShoppingCartString& s) {
        ShoppingCartTyped t;
        t.items = OrderItemCollection(s.items);
        t.shipping = Dollar(s.shipping);
        t.discount = Dollar(s.discount);
        t.totalprice = Dollar(s.totalprice);
        t.shippingaddress = Address(s.shippingaddress);
        t.billingaddress = Address(s.billingaddress);
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("items", json::Convert<OrderItemCollection>::to_json(items));
        m.emplace_back("shipping", json::Convert<Dollar>::to_json(shipping));
        m.emplace_back("discount", json::Convert<Dollar>::to_json(discount));
        m.emplace_back("totalprice", json::Convert<Dollar>::to_json(totalprice));
        m.emplace_back("shippingaddress", json::Convert<Address>::to_json(shippingaddress));
        m.emplace_back("billingaddress", json::Convert<Address>::to_json(billingaddress));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ShoppingCartTyped from_json_value(const json::Value& v) {
        ShoppingCartTyped t;
        t.items = json::Convert<OrderItemCollection>::from_json(json::require(v, "items"), "items");
        t.shipping = json::Convert<Dollar>::from_json(json::require(v, "shipping"), "shipping");
        t.discount = json::Convert<Dollar>::from_json(json::require(v, "discount"), "discount");
        t.totalprice = json::Convert<Dollar>::from_json(json::require(v, "totalprice"), "totalprice");
        t.shippingaddress = json::Convert<Address>::from_json(json::require(v, "shippingaddress"), "shippingaddress");
        t.billingaddress = json::Convert<Address>::from_json(json::require(v, "billingaddress"), "billingaddress");
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
};
