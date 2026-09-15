#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "request_string.h"

struct RequestTyped {
    std::string method;
    std::string page;
    std::string address;
    std::string benchmark;
    std::string format;

    static RequestTyped from_string_struct(const RequestString& s) {
        RequestTyped t;
        t.method = s.method;
        t.page = s.page;
        t.address = s.address;
        t.benchmark = s.benchmark;
        t.format = s.format;
        return t;
    }

    RequestString to_string_struct() const {
        RequestString s;
        s.method = method;
        s.page = page;
        s.address = address;
        s.benchmark = benchmark;
        s.format = format;
        return s;
    }

    static std::vector<RequestString> to_string_list(const std::vector<RequestTyped>& list) {
        std::vector<RequestString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<RequestTyped> from_string_list(const std::vector<RequestString>& list) {
        std::vector<RequestTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Method", json::Convert<std::string>::to_json(method));
        m.emplace_back("Page", json::Convert<std::string>::to_json(page));
        m.emplace_back("Address", json::Convert<std::string>::to_json(address));
        m.emplace_back("Benchmark", json::Convert<std::string>::to_json(benchmark));
        m.emplace_back("Format", json::Convert<std::string>::to_json(format));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static RequestTyped from_json_value(const json::Value& v) {
        RequestTyped t;
        t.method = json::Convert<std::string>::from_json(json::require(v, "Method"), "Method");
        t.page = json::Convert<std::string>::from_json(json::require(v, "Page"), "Page");
        t.address = json::Convert<std::string>::from_json(json::require(v, "Address"), "Address");
        t.benchmark = json::Convert<std::string>::from_json(json::require(v, "Benchmark"), "Benchmark");
        t.format = json::Convert<std::string>::from_json(json::require(v, "Format"), "Format");
        return t;
    }

    static RequestTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<RequestTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<RequestTyped> from_json_list(const std::string& text) {
        std::vector<RequestTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "RequestTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const RequestTyped& o) const {
        return method == o.method
            && page == o.page
            && address == o.address
            && benchmark == o.benchmark
            && format == o.format;
    }
    bool operator!=(const RequestTyped& o) const { return !(*this == o); }
};
