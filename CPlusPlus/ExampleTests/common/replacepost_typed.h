#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "replacepost_string.h"

struct ReplacePostTyped {
    int id = 0;
    int userid = 0;
    std::string title;
    std::string body;

    static ReplacePostTyped from_string_struct(const ReplacePostString& s) {
        ReplacePostTyped t;
        t.id = !s.id.empty() ? std::stoi(s.id) : 0;
        t.userid = !s.userid.empty() ? std::stoi(s.userid) : 0;
        t.title = s.title;
        t.body = s.body;
        return t;
    }

    ReplacePostString to_string_struct() const {
        ReplacePostString s;
        s.id = std::to_string(id);
        s.userid = std::to_string(userid);
        s.title = title;
        s.body = body;
        return s;
    }

    static std::vector<ReplacePostString> to_string_list(const std::vector<ReplacePostTyped>& list) {
        std::vector<ReplacePostString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<ReplacePostTyped> from_string_list(const std::vector<ReplacePostString>& list) {
        std::vector<ReplacePostTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("id", json::Convert<int>::to_json(id));
        m.emplace_back("userId", json::Convert<int>::to_json(userid));
        m.emplace_back("title", json::Convert<std::string>::to_json(title));
        m.emplace_back("body", json::Convert<std::string>::to_json(body));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static ReplacePostTyped from_json_value(const json::Value& v) {
        ReplacePostTyped t;
        t.id = json::Convert<int>::from_json(json::require(v, "id"), "id");
        t.userid = json::Convert<int>::from_json(json::require(v, "userId"), "userId");
        t.title = json::Convert<std::string>::from_json(json::require(v, "title"), "title");
        t.body = json::Convert<std::string>::from_json(json::require(v, "body"), "body");
        return t;
    }

    static ReplacePostTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<ReplacePostTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<ReplacePostTyped> from_json_list(const std::string& text) {
        std::vector<ReplacePostTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "ReplacePostTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const ReplacePostTyped& o) const {
        return id == o.id
            && userid == o.userid
            && title == o.title
            && body == o.body;
    }
    bool operator!=(const ReplacePostTyped& o) const { return !(*this == o); }
};
