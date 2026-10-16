#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "catalogitem_string.h"
#include "simpletext_typed.h"
#include "dollar_typed.h"

struct CatalogItemTyped {
    SimpleTextTyped name;
    DollarTyped price;

    static CatalogItemTyped from_string_struct(const CatalogItemString& s) {
        CatalogItemTyped t;
        t.name = SimpleTextTyped::from_string_struct(s.name);
        t.price = DollarTyped::from_string_struct(s.price);
        return t;
    }

    CatalogItemString to_string_struct() const {
        CatalogItemString s;
        s.name = name.to_string_struct();
        s.price = price.to_string_struct();
        return s;
    }

    static std::vector<CatalogItemString> to_string_list(const std::vector<CatalogItemTyped>& list) {
        std::vector<CatalogItemString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<CatalogItemTyped> from_string_list(const std::vector<CatalogItemString>& list) {
        std::vector<CatalogItemTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Name", name.to_json_value());
        m.emplace_back("Price", price.to_json_value());
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static CatalogItemTyped from_json_value(const json::Value& v) {
        CatalogItemTyped t;
        t.name = SimpleTextTyped::from_json_value(json::require(v, "Name"));
        t.price = DollarTyped::from_json_value(json::require(v, "Price"));
        return t;
    }

    static CatalogItemTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<CatalogItemTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<CatalogItemTyped> from_json_list(const std::string& text) {
        std::vector<CatalogItemTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "CatalogItemTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const CatalogItemTyped& o) const {
        return name == o.name
            && price == o.price;
    }
    bool operator!=(const CatalogItemTyped& o) const { return !(*this == o); }
};
