#pragma once
#include <string>
#include <vector>
#include "json.h"
#include "framevalues_string.h"

struct FrameValuesTyped {
    int frame = 0;
    std::string roll1;
    std::string roll2;
    std::string roll3;
    std::string score;
    std::string totalscore;

    static FrameValuesTyped from_string_struct(const FrameValuesString& s) {
        FrameValuesTyped t;
        t.frame = !s.frame.empty() ? std::stoi(s.frame) : 0;
        t.roll1 = s.roll1;
        t.roll2 = s.roll2;
        t.roll3 = s.roll3;
        t.score = s.score;
        t.totalscore = s.totalscore;
        return t;
    }

    FrameValuesString to_string_struct() const {
        FrameValuesString s;
        s.frame = std::to_string(frame);
        s.roll1 = roll1;
        s.roll2 = roll2;
        s.roll3 = roll3;
        s.score = score;
        s.totalscore = totalscore;
        return s;
    }

    static std::vector<FrameValuesString> to_string_list(const std::vector<FrameValuesTyped>& list) {
        std::vector<FrameValuesString> result;
        for (const auto& t : list) result.push_back(t.to_string_struct());
        return result;
    }

    static std::vector<FrameValuesTyped> from_string_list(const std::vector<FrameValuesString>& list) {
        std::vector<FrameValuesTyped> result;
        for (const auto& s : list) result.push_back(from_string_struct(s));
        return result;
    }

    json::Value to_json_value() const {
        json::Members m;
        m.emplace_back("Frame", json::Convert<int>::to_json(frame));
        m.emplace_back("Roll1", json::Convert<std::string>::to_json(roll1));
        m.emplace_back("Roll2", json::Convert<std::string>::to_json(roll2));
        m.emplace_back("Roll3", json::Convert<std::string>::to_json(roll3));
        m.emplace_back("Score", json::Convert<std::string>::to_json(score));
        m.emplace_back("TotalScore", json::Convert<std::string>::to_json(totalscore));
        return json::Value::make_object(std::move(m));
    }

    std::string to_json() const { return json::write(to_json_value()); }

    static FrameValuesTyped from_json_value(const json::Value& v) {
        FrameValuesTyped t;
        t.frame = json::Convert<int>::from_json(json::require(v, "Frame"), "Frame");
        t.roll1 = json::Convert<std::string>::from_json(json::require(v, "Roll1"), "Roll1");
        t.roll2 = json::Convert<std::string>::from_json(json::require(v, "Roll2"), "Roll2");
        t.roll3 = json::Convert<std::string>::from_json(json::require(v, "Roll3"), "Roll3");
        t.score = json::Convert<std::string>::from_json(json::require(v, "Score"), "Score");
        t.totalscore = json::Convert<std::string>::from_json(json::require(v, "TotalScore"), "TotalScore");
        return t;
    }

    static FrameValuesTyped from_json(const std::string& text) {
        return from_json_value(json::parse(text));
    }

    static std::string to_json_list(const std::vector<FrameValuesTyped>& list) {
        json::Elements e;
        for (const auto& item : list) e.push_back(item.to_json_value());
        return json::write(json::Value::make_array(std::move(e)));
    }

    static std::vector<FrameValuesTyped> from_json_list(const std::string& text) {
        std::vector<FrameValuesTyped> result;
        const json::Value v = json::parse(text);
        json::require_array(v, "FrameValuesTyped");
        for (const json::Value& e : v.elements())
            result.push_back(from_json_value(e));
        return result;
    }

    bool operator==(const FrameValuesTyped& o) const {
        return frame == o.frame
            && roll1 == o.roll1
            && roll2 == o.roll2
            && roll3 == o.roll3
            && score == o.score
            && totalscore == o.totalscore;
    }
    bool operator!=(const FrameValuesTyped& o) const { return !(*this == o); }
};
