#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "orderitem_string.h"

struct OrderItemTyped {
    std::string name;
    int quantity = 0;
    std::string price;
    std::string itemtotal;

    static OrderItemTyped from_string_struct(const OrderItemString& s) {
        OrderItemTyped t;
        t.name = s.name;
        t.quantity = !s.quantity.empty() ? std::stoi(s.quantity) : 0;
        t.price = s.price;
        t.itemtotal = s.itemtotal;
        return t;
    }

    OrderItemString to_string_struct() const {
        OrderItemString s;
        s.name = name;
        s.quantity = std::to_string(quantity);
        s.price = price;
        s.itemtotal = itemtotal;
        return s;
    }

    static std::vector<OrderItemString> to_string_list(const std::vector<OrderItemTyped>& list) {
        std::vector<OrderItemString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<OrderItemTyped> from_string_list(const std::vector<OrderItemString>& list) {
        std::vector<OrderItemTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Name", json::Convert<std::string>::to_json(name));
        m.emplace_back("Quantity", json::Convert<int>::to_json(quantity));
        m.emplace_back("Price", json::Convert<std::string>::to_json(price));
        m.emplace_back("ItemTotal", json::Convert<std::string>::to_json(itemtotal));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static OrderItemTyped from_json_value(const json::Value& v) {
        OrderItemTyped t;
        t.name = json::Convert<std::string>::from_json(json::require(v, "Name"), "Name");
        t.quantity = json::Convert<int>::from_json(json::require(v, "Quantity"), "Quantity");
        t.price = json::Convert<std::string>::from_json(json::require(v, "Price"), "Price");
        t.itemtotal = json::Convert<std::string>::from_json(json::require(v, "ItemTotal"), "ItemTotal");
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

    bool operator==(const OrderItemTyped& o) const {
        return name == o.name
            && quantity == o.quantity
            && price == o.price
            && itemtotal == o.itemtotal;
    }
    bool operator!=(const OrderItemTyped& o) const { return !(*this == o); }
};
