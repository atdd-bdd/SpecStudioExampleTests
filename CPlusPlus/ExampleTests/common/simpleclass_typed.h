#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "simpleclass_string.h"

struct SimpleClassTyped {
    int anint = 0;
    std::string astring;

    static SimpleClassTyped from_string_struct(const SimpleClassString& s) {
        SimpleClassTyped t;
        t.anint = !s.anint.empty() ? std::stoi(s.anint) : 0;
        t.astring = s.astring;
        return t;
    }

    SimpleClassString to_string_struct() const {
        SimpleClassString s;
        s.anint = std::to_string(anint);
        s.astring = astring;
        return s;
    }

    static std::vector<SimpleClassString> to_string_list(const std::vector<SimpleClassTyped>& list) {
        std::vector<SimpleClassString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<SimpleClassTyped> from_string_list(const std::vector<SimpleClassString>& list) {
        std::vector<SimpleClassTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("anInt", json::Convert<int>::to_json(anint));
        m.emplace_back("aString", json::Convert<std::string>::to_json(astring));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static SimpleClassTyped from_json_value(const json::Value& v) {
        SimpleClassTyped t;
        t.anint = json::Convert<int>::from_json(json::require(v, "anInt"), "anInt");
        t.astring = json::Convert<std::string>::from_json(json::require(v, "aString"), "aString");
        return t;
    }

    static SimpleClassTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<SimpleClassTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<SimpleClassTyped> from_json_list(const std::string& text) {
        std::vector<SimpleClassTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "SimpleClassTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const SimpleClassTyped& o) const {
        return anint == o.anint
            && astring == o.astring;
    }
    bool operator!=(const SimpleClassTyped& o) const { return !(*this == o); }
};
