#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "orderitem_string.h"

struct OrderItemTyped {
    SimpleText name;
    int quantity = 0;
    Dollar price;
    Dollar itemtotal;

    static OrderItemTyped from_string_struct(const OrderItemString& s) {
        OrderItemTyped t;
        t.name = SimpleText(s.name);
        t.quantity = !s.quantity.empty() ? std::stoi(s.quantity) : 0;
        t.price = Dollar(s.price);
        t.itemtotal = Dollar(s.itemtotal);
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("name", json::Convert<SimpleText>::to_json(name));
        m.emplace_back("quantity", json::Convert<int>::to_json(quantity));
        m.emplace_back("price", json::Convert<Dollar>::to_json(price));
        m.emplace_back("itemtotal", json::Convert<Dollar>::to_json(itemtotal));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static OrderItemTyped from_json_value(const json::Value& v) {
        OrderItemTyped t;
        t.name = json::Convert<SimpleText>::from_json(json::require(v, "name"), "name");
        t.quantity = json::Convert<int>::from_json(json::require(v, "quantity"), "quantity");
        t.price = json::Convert<Dollar>::from_json(json::require(v, "price"), "price");
        t.itemtotal = json::Convert<Dollar>::from_json(json::require(v, "itemtotal"), "itemtotal");
        return t;
    }

    static OrderItemTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<OrderItemTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<OrderItemTyped> from_json_list(const std::string& text) {
        std::vector<OrderItemTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "OrderItemTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }
};
