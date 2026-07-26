#pragma once
// The DataTypes the specifications declare, each throwing std::invalid_argument
// when the text does not satisfy its rule so the glue can state whether a value
// was meant to be valid.

#include <cctype>
#include <cstdlib>
#include <stdexcept>
#include <string>

// ---------------------------------------------------------------------------
// Dollar — a monetary amount: never negative, never finer than a cent.
// Held as whole cents so the arithmetic is exact.
// ---------------------------------------------------------------------------

class Percentage;

class Dollar {
public:
    Dollar() : cents_(0) {}
    explicit Dollar(long long cents) : cents_(cents) {}

    /// Reads "$10.00", "10", "0.01" and the like.
    explicit Dollar(const std::string& value) {
        std::string text;
        for (char c : value) if (c != '$') text += c;
        while (!text.empty() && std::isspace(static_cast<unsigned char>(text.front())))
            text.erase(text.begin());
        while (!text.empty() && std::isspace(static_cast<unsigned char>(text.back())))
            text.pop_back();
        if (text.empty()) { cents_ = 0; return; }

        const bool negative = text[0] == '-';
        std::size_t i = (text[0] == '-' || text[0] == '+') ? 1 : 0;
        std::string whole, frac;
        bool seen_dot = false;
        for (; i < text.size(); ++i) {
            if (text[i] == '.') {
                if (seen_dot) throw std::invalid_argument("Not a number: " + value);
                seen_dot = true;
                continue;
            }
            if (!std::isdigit(static_cast<unsigned char>(text[i])))
                throw std::invalid_argument("Not a number: " + value);
            (seen_dot ? frac : whole) += text[i];
        }
        if (whole.empty() && frac.empty())
            throw std::invalid_argument("Not a number: " + value);
        if (frac.size() > 2)
            throw std::invalid_argument(
                "Dollar amount must not have more than two decimal digits: " + value);

        long long wv = whole.empty() ? 0 : std::stoll(whole);
        long long fv = 0;
        if (frac.size() == 1) fv = std::stoll(frac) * 10;
        else if (frac.size() == 2) fv = std::stoll(frac);

        long long total = wv * 100 + fv;
        if (negative && total != 0)
            throw std::invalid_argument("Dollar amount cannot be negative: " + value);
        cents_ = total;
    }

    long long cents() const { return cents_; }

    Dollar plus(const Dollar& o) const { return Dollar(cents_ + o.cents_); }
    Dollar minus(const Dollar& o) const { return Dollar(cents_ - o.cents_); }
    Dollar times(int factor) const { return Dollar(cents_ * factor); }

    /// The given percentage of this amount, rounded half up to the nearest cent.
    Dollar percent_of(const Percentage& p) const;

    bool operator==(const Dollar& o) const { return cents_ == o.cents_; }
    bool operator!=(const Dollar& o) const { return !(*this == o); }

    std::string to_string() const {
        const char* sign = cents_ < 0 ? "-" : "";
        long long c = cents_ < 0 ? -cents_ : cents_;
        std::string frac = std::to_string(c % 100);
        if (frac.size() < 2) frac = "0" + frac;
        return sign + std::to_string(c / 100) + "." + frac;
    }

private:
    long long cents_;
};

// ---------------------------------------------------------------------------
// Percentage — 0 to 100 inclusive.
// ---------------------------------------------------------------------------

class Percentage {
public:
    Percentage() : value_(0) {}
    explicit Percentage(int value) : value_(value) {}

    explicit Percentage(const std::string& value) {
        std::string text;
        for (char c : value) if (c != '%' && !std::isspace(static_cast<unsigned char>(c)))
            text += c;
        if (text.empty()) throw std::invalid_argument("Not a number: " + value);
        std::size_t i = (text[0] == '-' || text[0] == '+') ? 1 : 0;
        if (i >= text.size()) throw std::invalid_argument("Not a number: " + value);
        for (std::size_t j = i; j < text.size(); ++j)
            if (!std::isdigit(static_cast<unsigned char>(text[j])))
                throw std::invalid_argument("Not a number: " + value);
        value_ = std::stoi(text);
        if (value_ < 0 || value_ > 100)
            throw std::invalid_argument("Percentage must be between 0 and 100: " + value);
    }

    int value() const { return value_; }

    bool operator==(const Percentage& o) const { return value_ == o.value_; }
    bool operator!=(const Percentage& o) const { return !(*this == o); }

    std::string to_string() const { return std::to_string(value_); }

private:
    int value_;
};

inline Dollar Dollar::percent_of(const Percentage& p) const {
    return Dollar((cents_ * p.value() + 50) / 100);
}

// ---------------------------------------------------------------------------
// SimpleText — alphabetic, numeric, space, hyphen, period, comma.
// ---------------------------------------------------------------------------

class SimpleText {
public:
    SimpleText() = default;

    explicit SimpleText(const std::string& value) : value_(value) {
        for (char c : value_) {
            const bool ok = std::isalnum(static_cast<unsigned char>(c))
                || c == ' ' || c == ',' || c == '.' || c == '-';
            if (!ok) throw std::invalid_argument("Invalid SimpleText: " + value_);
        }
    }

    /// Builds without checking, for text a spec has already accepted.
    static SimpleText unchecked(const std::string& value) {
        SimpleText t;
        t.value_ = value;
        return t;
    }

    const std::string& value() const { return value_; }

    bool operator==(const SimpleText& o) const { return value_ == o.value_; }
    bool operator!=(const SimpleText& o) const { return !(*this == o); }

    std::string to_string() const { return value_; }

private:
    std::string value_;
};

// ---------------------------------------------------------------------------
// IDForm — exactly five characters, beginning with Q.
// ---------------------------------------------------------------------------

class IDForm {
public:
    IDForm() = default;

    explicit IDForm(const std::string& value) : value_(value) {
        if (value_.size() != 5 || value_.rfind("Q", 0) != 0)
            throw std::invalid_argument("Must be 5 characters starting with Q");
    }

    const std::string& value() const { return value_; }

    bool operator==(const IDForm& o) const { return value_ == o.value_; }
    bool operator!=(const IDForm& o) const { return !(*this == o); }

    std::string to_string() const { return value_; }

private:
    std::string value_;
};
