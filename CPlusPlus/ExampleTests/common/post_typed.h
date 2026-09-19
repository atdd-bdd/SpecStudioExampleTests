#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "post_string.h"

struct PostTyped {
    int userid = 0;
    int id = 0;
    std::string title;
    std::string body;

    static PostTyped from_string_struct(const PostString& s) {
        PostTyped t;
        t.userid = !s.userid.empty() ? std::stoi(s.userid) : 0;
        t.id = !s.id.empty() ? std::stoi(s.id) : 0;
        t.title = s.title;
        t.body = s.body;
        return t;
    }

    PostString to_string_struct() const {
        PostString s;
        s.userid = std::to_string(userid);
        s.id = std::to_string(id);
        s.title = title;
        s.body = body;
        return s;
    }

    static std::vector<PostString> to_string_list(const std::vector<PostTyped>& list) {
        std::vector<PostString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<PostTyped> from_string_list(const std::vector<PostString>& list) {
        std::vector<PostTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("userId", json::Convert<int>::to_json(userid));
        m.emplace_back("id", json::Convert<int>::to_json(id));
        m.emplace_back("title", json::Convert<std::string>::to_json(title));
        m.emplace_back("body", json::Convert<std::string>::to_json(body));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static PostTyped from_json_value(const json::Value& v) {
        PostTyped t;
        t.userid = json::Convert<int>::from_json(json::require(v, "userId"), "userId");
        t.id = json::Convert<int>::from_json(json::require(v, "id"), "id");
        t.title = json::Convert<std::string>::from_json(json::require(v, "title"), "title");
        t.body = json::Convert<std::string>::from_json(json::require(v, "body"), "body");
        return t;
    }

    static PostTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<PostTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<PostTyped> from_json_list(const std::string& text) {
        std::vector<PostTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "PostTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const PostTyped& o) const {
        return userid == o.userid
            && id == o.id
            && title == o.title
            && body == o.body;
    }
    bool operator!=(const PostTyped& o) const { return !(*this == o); }
};
