#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "apirequest_string.h"

struct ApiRequestTyped {
    std::string method;
    std::string page;
    std::string parameter;
    std::string body;

    static ApiRequestTyped from_string_struct(const ApiRequestString& s) {
        ApiRequestTyped t;
        t.method = s.method;
        t.page = s.page;
        t.parameter = s.parameter;
        t.body = s.body;
        return t;
    }

    ApiRequestString to_string_struct() const {
        ApiRequestString s;
        s.method = method;
        s.page = page;
        s.parameter = parameter;
        s.body = body;
        return s;
    }

    static std::vector<ApiRequestString> to_string_list(const std::vector<ApiRequestTyped>& list) {
        std::vector<ApiRequestString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ApiRequestTyped> from_string_list(const std::vector<ApiRequestString>& list) {
        std::vector<ApiRequestTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Method", json::Convert<std::string>::to_json(method));
        m.emplace_back("Page", json::Convert<std::string>::to_json(page));
        m.emplace_back("Parameter", json::Convert<std::string>::to_json(parameter));
        m.emplace_back("Body", json::Convert<std::string>::to_json(body));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ApiRequestTyped from_json_value(const json::Value& v) {
        ApiRequestTyped t;
        t.method = json::Convert<std::string>::from_json(json::require(v, "Method"), "Method");
        t.page = json::Convert<std::string>::from_json(json::require(v, "Page"), "Page");
        t.parameter = json::Convert<std::string>::from_json(json::require(v, "Parameter"), "Parameter");
        t.body = json::Convert<std::string>::from_json(json::require(v, "Body"), "Body");
        return t;
    }

    static ApiRequestTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ApiRequestTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ApiRequestTyped> from_json_list(const std::string& text) {
        std::vector<ApiRequestTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ApiRequestTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ApiRequestTyped& o) const {
        return method == o.method
            && page == o.page
            && parameter == o.parameter
            && body == o.body;
    }
    bool operator!=(const ApiRequestTyped& o) const { return !(*this == o); }
};
