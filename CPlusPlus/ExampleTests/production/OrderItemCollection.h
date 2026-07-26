#pragma once
#include <vector>
#include <algorithm>
#include "OrderItem.h"

class OrderItemCollection {
public:
    static constexpr int MINIMUM = 0;
    static constexpr int MAXIMUM = 100;

    void add(const OrderItem& item) { items_.push_back(item); }

    bool remove(const OrderItem& item) {
        auto it = std::find_if(items_.begin(), items_.end(),
            [&](const OrderItem& x){ return x.name == item.name; });
        if (it == items_.end()) return false;
        items_.erase(it); return true;
    }

    const std::vector<OrderItem>& read() const { return items_; }

    bool update(const OrderItem& old_item, const OrderItem& new_item) {
        auto it = std::find_if(items_.begin(), items_.end(),
            [&](const OrderItem& x){ return x.name == old_item.name; });
        if (it == items_.end()) return false;
        *it = new_item; return true;
    }

    int size() const { return static_cast<int>(items_.size()); }

private:
    std::vector<OrderItem> items_;
};
