#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "catalogitem_string.h"

struct CatalogItemTyped {
    std::string name;
    std::string price;

    static CatalogItemTyped from_string_struct(const CatalogItemString& s) {
        CatalogItemTyped t;
        t.name = s.name;
        t.price = s.price;
        return t;
    }

    CatalogItemString to_string_struct() const {
        CatalogItemString s;
        s.name = name;
        s.price = price;
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
        m.emplace_back("Name", json::Convert<std::string>::to_json(name));
        m.emplace_back("Price", json::Convert<std::string>::to_json(price));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static CatalogItemTyped from_json_value(const json::Value& v) {
        CatalogItemTyped t;
        t.name = json::Convert<std::string>::from_json(json::require(v, "Name"), "Name");
        t.price = json::Convert<std::string>::from_json(json::require(v, "Price"), "Price");
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
