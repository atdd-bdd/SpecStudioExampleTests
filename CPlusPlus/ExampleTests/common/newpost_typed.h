#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "newpost_string.h"

struct NewPostTyped {
    std::string title;
    std::string body;
    int userid = 0;

    static NewPostTyped from_string_struct(const NewPostString& s) {
        NewPostTyped t;
        t.title = s.title;
        t.body = s.body;
        t.userid = !s.userid.empty() ? std::stoi(s.userid) : 0;
        return t;
    }

    NewPostString to_string_struct() const {
        NewPostString s;
        s.title = title;
        s.body = body;
        s.userid = std::to_string(userid);
        return s;
    }

    static std::vector<NewPostString> to_string_list(const std::vector<NewPostTyped>& list) {
        std::vector<NewPostString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<NewPostTyped> from_string_list(const std::vector<NewPostString>& list) {
        std::vector<NewPostTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("title", json::Convert<std::string>::to_json(title));
        m.emplace_back("body", json::Convert<std::string>::to_json(body));
        m.emplace_back("userId", json::Convert<int>::to_json(userid));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static NewPostTyped from_json_value(const json::Value& v) {
        NewPostTyped t;
        t.title = json::Convert<std::string>::from_json(json::require(v, "title"), "title");
        t.body = json::Convert<std::string>::from_json(json::require(v, "body"), "body");
        t.userid = json::Convert<int>::from_json(json::require(v, "userId"), "userId");
        return t;
    }

    static NewPostTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<NewPostTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<NewPostTyped> from_json_list(const std::string& text) {
        std::vector<NewPostTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "NewPostTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const NewPostTyped& o) const {
        return title == o.title
            && body == o.body
            && userid == o.userid;
    }
    bool operator!=(const NewPostTyped& o) const { return !(*this == o); }
};
