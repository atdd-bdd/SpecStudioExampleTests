#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "pricing_string.h"

struct PricingTyped {
    std::string totalprice;

    static PricingTyped from_string_struct(const PricingString& s) {
        PricingTyped t;
        t.totalprice = s.totalprice;
        return t;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("totalprice", json::Convert<std::string>::to_json(totalprice));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static PricingTyped from_json_value(const json::Value& v) {
        PricingTyped t;
        t.totalprice = json::Convert<std::string>::from_json(json::require(v, "totalprice"), "totalprice");
        return t;
    }

    static PricingTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<PricingTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<PricingTyped> from_json_list(const std::string& text) {
        std::vector<PricingTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "PricingTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const PricingTyped& o) const {
        return totalprice == o.totalprice;
    }
    bool operator!=(const PricingTyped& o) const { return !(*this == o); }
};
