#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "discountinput_string.h"

struct DiscountInputTyped {
    std::string total_price;
    std::string discount;
    std::string notes;

    static DiscountInputTyped from_string_struct(const DiscountInputString& s) {
        DiscountInputTyped t;
        t.total_price = s.total_price;
        t.discount = s.discount;
        t.notes = s.notes;
        return t;
    }

    DiscountInputString to_string_struct() const {
        DiscountInputString s;
        s.total_price = total_price;
        s.discount = discount;
        s.notes = notes;
        return s;
    }

    static std::vector<DiscountInputString> to_string_list(const std::vector<DiscountInputTyped>& list) {
        std::vector<DiscountInputString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<DiscountInputTyped> from_string_list(const std::vector<DiscountInputString>& list) {
        std::vector<DiscountInputTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Total Price", json::Convert<std::string>::to_json(total_price));
        m.emplace_back("Discount", json::Convert<std::string>::to_json(discount));
        m.emplace_back("Notes", json::Convert<std::string>::to_json(notes));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static DiscountInputTyped from_json_value(const json::Value& v) {
        DiscountInputTyped t;
        t.total_price = json::Convert<std::string>::from_json(json::require(v, "Total Price"), "Total Price");
        t.discount = json::Convert<std::string>::from_json(json::require(v, "Discount"), "Discount");
        t.notes = json::Convert<std::string>::from_json(json::require(v, "Notes"), "Notes");
        return t;
    }

    static DiscountInputTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<DiscountInputTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<DiscountInputTyped> from_json_list(const std::string& text) {
        std::vector<DiscountInputTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "DiscountInputTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const DiscountInputTyped& o) const {
        return total_price == o.total_price
            && discount == o.discount
            && notes == o.notes;
    }
    bool operator!=(const DiscountInputTyped& o) const { return !(*this == o); }
};
