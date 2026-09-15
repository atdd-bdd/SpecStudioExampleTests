#pragma once
#include <vector>
#include <algorithm>
#include "Match.h"

class MatchCollection {
public:
    static constexpr int MINIMUM = 0;
    static constexpr int MAXIMUM = 10000;

    void add(const Match& item) { items_.push_back(item); }

    bool remove(const Match& item) {
        auto it = std::find_if(items_.begin(), items_.end(),
            [&](const Match& x){ return x.name == item.name; });
        if (it == items_.end()) return false;
        items_.erase(it); return true;
    }

    const std::vector<Match>& read() const { return items_; }

    bool update(const Match& old_item, const Match& new_item) {
        auto it = std::find_if(items_.begin(), items_.end(),
            [&](const Match& x){ return x.name == old_item.name; });
        if (it == items_.end()) return false;
        *it = new_item; return true;
    }

    int size() const { return static_cast<int>(items_.size()); }

private:
    std::vector<Match> items_;
};
