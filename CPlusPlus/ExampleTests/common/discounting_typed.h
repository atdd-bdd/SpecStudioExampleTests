#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "discounting_string.h"

struct DiscountingTyped {
    std::string total_price;
    std::string discount;
    std::string notes;

    static DiscountingTyped from_string_struct(const DiscountingString& s) {
        DiscountingTyped t;
        t.total_price = s.total_price;
        t.discount = s.discount;
        t.notes = s.notes;
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("total_price", json::Convert<std::string>::to_json(total_price));
        m.emplace_back("discount", json::Convert<std::string>::to_json(discount));
        m.emplace_back("notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static DiscountingTyped from_json_value(const json::Value& v) {
        DiscountingTyped t;
        t.total_price = json::Convert<std::string>::from_json(json::require(v, "total_price"), "total_price");
        t.discount = json::Convert<std::string>::from_json(json::require(v, "discount"), "discount");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "notes"), "notes");
        return t;
    }

    static DiscountingTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<DiscountingTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<DiscountingTyped> from_json_list(const std::string& text) {
        std::vector<DiscountingTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "DiscountingTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const DiscountingTyped& o) const {
        return total_price == o.total_price
            && discount == o.discount
            && notes == o.notes;
    }
    bool operator!=(const DiscountingTyped& o) const { return !(*this == o); }
};
