#pragma once
// A frame score or running total, or -1 (TBS) while the rolls it depends on have not
// all been made.
//
// The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect game
// -- and rejects 301; -1 is valid only because the spec defines TBS as -1:
// a frame ending in a strike or a spare cannot be scored until its bonus rolls
// exist, and "not yet computable" is a normal state rather than an error.

#include <stdexcept>
#include <string>

class Score {
public:
    // Marker for a score that cannot be computed yet: the integer the spec defines TBS as.
    static constexpr int tbs_value = -1;

    static constexpr int min = 0;
    static constexpr int max = 300;

    // The value a frame not yet scorable carries.
    static Score tbs() { return Score(tbs_value); }

    // From the text form a table cell holds.
    explicit Score(const std::string& text) : points_(parse(trim(text))) {}

    // The score of a total already known to be in range.
    explicit Score(int points) : points_(points) {}

    int value() const { return points_; }

    bool is_computable() const { return points_ != tbs_value; }

    // Points, or -1 when not yet computable.
    int points() const { return points_; }

    // The text form: what a table cell holds.
    std::string to_string() const { return std::to_string(points_); }

    bool operator==(const Score& o) const { return points_ == o.points_; }

private:
    static int parse(const std::string& text)
    {
        std::size_t used = 0;
        int points = 0;
        try {
            points = std::stoi(text, &used);
        } catch (const std::exception&) {
            throw std::invalid_argument("Not a score: " + text);
        }
        if (used != text.size())
            throw std::invalid_argument("Not a score: " + text);
        if (points != tbs_value && (points < min || points > max))
            throw std::invalid_argument("Score must be between " + std::to_string(min)
                                        + " and " + std::to_string(max)
                                        + ", got " + std::to_string(points));
        return points;
    }

    static std::string trim(const std::string& value)
    {
        const std::size_t first = value.find_first_not_of(" \t\r\n");
        if (first == std::string::npos) return "";
        return value.substr(first, value.find_last_not_of(" \t\r\n") - first + 1);
    }

    int points_;
};
