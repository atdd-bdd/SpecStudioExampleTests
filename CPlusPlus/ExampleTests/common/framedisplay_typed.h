#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "framedisplay_string.h"

struct FrameDisplayTyped {
    std::string frame;
    std::string mark1;
    std::string mark2;
    std::string mark3;
    std::string totalscore;

    static FrameDisplayTyped from_string_struct(const FrameDisplayString& s) {
        FrameDisplayTyped t;
        t.frame = s.frame;
        t.mark1 = s.mark1;
        t.mark2 = s.mark2;
        t.mark3 = s.mark3;
        t.totalscore = s.totalscore;
        return t;
    }

    FrameDisplayString to_string_struct() const {
        FrameDisplayString s;
        s.frame = frame;
        s.mark1 = mark1;
        s.mark2 = mark2;
        s.mark3 = mark3;
        s.totalscore = totalscore;
        return s;
    }

    static std::vector<FrameDisplayString> to_string_list(const std::vector<FrameDisplayTyped>& list) {
        std::vector<FrameDisplayString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<FrameDisplayTyped> from_string_list(const std::vector<FrameDisplayString>& list) {
        std::vector<FrameDisplayTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Frame", json::Convert<std::string>::to_json(frame));
        m.emplace_back("Mark1", json::Convert<std::string>::to_json(mark1));
        m.emplace_back("Mark2", json::Convert<std::string>::to_json(mark2));
        m.emplace_back("Mark3", json::Convert<std::string>::to_json(mark3));
        m.emplace_back("TotalScore", json::Convert<std::string>::to_json(totalscore));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static FrameDisplayTyped from_json_value(const json::Value& v) {
        FrameDisplayTyped t;
        t.frame = json::Convert<std::string>::from_json(json::require(v, "Frame"), "Frame");
        t.mark1 = json::Convert<std::string>::from_json(json::require(v, "Mark1"), "Mark1");
        t.mark2 = json::Convert<std::string>::from_json(json::require(v, "Mark2"), "Mark2");
        t.mark3 = json::Convert<std::string>::from_json(json::require(v, "Mark3"), "Mark3");
        t.totalscore = json::Convert<std::string>::from_json(json::require(v, "TotalScore"), "TotalScore");
        return t;
    }

    static FrameDisplayTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<FrameDisplayTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<FrameDisplayTyped> from_json_list(const std::string& text) {
        std::vector<FrameDisplayTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "FrameDisplayTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const FrameDisplayTyped& o) const {
        return frame == o.frame
            && mark1 == o.mark1
            && mark2 == o.mark2
            && mark3 == o.mark3
            && totalscore == o.totalscore;
    }
    bool operator!=(const FrameDisplayTyped& o) const { return !(*this == o); }
};
