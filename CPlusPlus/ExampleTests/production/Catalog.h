#pragma once
#include <vector>
#include <algorithm>
#include "CatalogItem.h"

class Catalog {
public:
    static constexpr int MINIMUM = 0;
    static constexpr int MAXIMUM = 10000000;

    void add(const CatalogItem& item) { items_.push_back(item); }

    bool remove(const CatalogItem& item) {
        auto it = std::find_if(items_.begin(), items_.end(),
            [&](const CatalogItem& x){ return x.name == item.name; });
        if (it == items_.end()) return false;
        items_.erase(it); return true;
    }

    const std::vector<CatalogItem>& read() const { return items_; }

    bool update(const CatalogItem& old_item, const CatalogItem& new_item) {
        auto it = std::find_if(items_.begin(), items_.end(),
            [&](const CatalogItem& x){ return x.name == old_item.name; });
        if (it == items_.end()) return false;
        *it = new_item; return true;
    }

    int size() const { return static_cast<int>(items_.size()); }

private:
    std::vector<CatalogItem> items_;
};
