#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "itempriceinput_string.h"

struct ItemPriceInputTyped {
    std::string totalitems;

    static ItemPriceInputTyped from_string_struct(const ItemPriceInputString& s) {
        ItemPriceInputTyped t;
        t.totalitems = s.totalitems;
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("totalitems", json::Convert<std::string>::to_json(totalitems));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ItemPriceInputTyped from_json_value(const json::Value& v) {
        ItemPriceInputTyped t;
        t.totalitems = json::Convert<std::string>::from_json(json::require(v, "totalitems"), "totalitems");
        return t;
    }

    static ItemPriceInputTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ItemPriceInputTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ItemPriceInputTyped> from_json_list(const std::string& text) {
        std::vector<ItemPriceInputTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ItemPriceInputTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ItemPriceInputTyped& o) const {
        return totalitems == o.totalitems;
    }
    bool operator!=(const ItemPriceInputTyped& o) const { return !(*this == o); }
};
