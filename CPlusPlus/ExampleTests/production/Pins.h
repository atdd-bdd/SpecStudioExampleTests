#pragma once
// The number of pins knocked down by one roll, or -1 (TBR) when the roll has not
// happened yet.
//
// The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and -2
// are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls that
// are still to come. The constructor refuses exactly the invalid ones, so a
// number out of range fails the same way an unparseable one does.

#include <stdexcept>
#include <string>

class Pins {
public:
    // Marker for a roll that has not been made: the integer the spec defines TBR as.
    static constexpr int tbr_value = -1;

    static constexpr int max = 10;

    // The value a roll not yet made carries.
    static Pins tbr() { return Pins(tbr_value); }

    // From the text form a table cell holds.
    explicit Pins(const std::string& text) : count_(parse(trim(text))) {}

    // The roll of a count already known to be in range.
    explicit Pins(int count) : count_(count) {}

    int value() const { return count_; }

    // False when this is TBR -- the roll has not been made.
    bool is_rolled() const { return count_ != tbr_value; }

    // Pin count, or -1 when the roll has not been made.
    int count() const { return count_; }

    bool is_strike() const { return is_rolled() && count_ == max; }

    // The text form: what a table cell holds.
    std::string to_string() const { return std::to_string(count_); }

    bool operator==(const Pins& o) const { return count_ == o.count_; }

private:
    static int parse(const std::string& text)
    {
        std::size_t used = 0;
        int count = 0;
        try {
            count = std::stoi(text, &used);
        } catch (const std::exception&) {
            throw std::invalid_argument("Not a number of pins: " + text);
        }
        if (used != text.size())
            throw std::invalid_argument("Not a number of pins: " + text);
        if (count != tbr_value && (count < 0 || count > max))
            throw std::invalid_argument("Roll must be between 0 and " + std::to_string(max)
                                        + ", got " + std::to_string(count));
        return count;
    }

    static std::string trim(const std::string& value)
    {
        const std::size_t first = value.find_first_not_of(" \t\r\n");
        if (first == std::string::npos) return "";
        return value.substr(first, value.find_last_not_of(" \t\r\n") - first + 1);
    }

    int count_;
};
