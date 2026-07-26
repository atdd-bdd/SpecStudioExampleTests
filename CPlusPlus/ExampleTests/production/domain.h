#pragma once
// The entities and collections the Shopping Cart and Record Filter
// specifications describe.

#include <optional>
#include <string>
#include <vector>

#include "datatypes.h"

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

struct IDValue {
    IDForm id;
    int value = 0;

    IDValue() = default;
    IDValue(IDForm id_, int value_) : id(id_), value(value_) {}

    bool operator==(const IDValue& o) const { return id == o.id && value == o.value; }
};

/// Holds IDValue records and sums the ones carrying a given ID.
class RecordFilter {
public:
    void add(const IDValue& entry) { entries_.push_back(entry); }

    int sum_by_label(const IDForm& filter_label) const {
        int sum = 0;
        for (const auto& e : entries_)
            if (e.id == filter_label) sum += e.value;
        return sum;
    }

private:
    std::vector<IDValue> entries_;
};

/// Truncates toward zero, so -40F comes out -40C.
inline int fahrenheit_to_celsius(int fahrenheit) { return (fahrenheit - 32) * 5 / 9; }

class Calculator {
public:
    int add(int a, int b) const { return a + b; }
};

// ---------------------------------------------------------------------------
// Shopping
// ---------------------------------------------------------------------------

struct Address {
    SimpleText street, city, state, zip;

    Address() = default;
    Address(SimpleText s, SimpleText c, SimpleText st, SimpleText z)
        : street(s), city(c), state(st), zip(z) {}

    bool operator==(const Address& o) const {
        return street == o.street && city == o.city && state == o.state && zip == o.zip;
    }
};

struct CatalogItem {
    SimpleText name;
    Dollar price;

    CatalogItem() = default;
    CatalogItem(SimpleText n, Dollar p) : name(n), price(p) {}

    bool operator==(const CatalogItem& o) const {
        return name == o.name && price == o.price;
    }
};

constexpr int kCatalogMinimum = 0;
constexpr int kCatalogMaximum = 10000000;

/// The items on offer, each with the price an order line is charged.
class Catalog {
public:
    void add(const CatalogItem& item) { items_.push_back(item); }
    const std::vector<CatalogItem>& read() const { return items_; }
    std::size_t size() const { return items_.size(); }

    std::optional<Dollar> price_for(const SimpleText& name) const {
        for (const auto& i : items_)
            if (i.name == name) return i.price;
        return std::nullopt;
    }

private:
    std::vector<CatalogItem> items_;
};

struct OrderItem {
    SimpleText name;
    int quantity = 0;
    Dollar price;
    Dollar item_total;

    OrderItem() = default;
    OrderItem(SimpleText n, int q, Dollar p, Dollar t)
        : name(n), quantity(q), price(p), item_total(t) {}

    static OrderItem create(SimpleText name, int quantity, Dollar price) {
        return OrderItem(name, quantity, price, price.times(quantity));
    }

    /// Looks the price up rather than being told it.
    static std::optional<OrderItem> from_catalog(const Catalog& catalog,
                                                 const SimpleText& name, int quantity) {
        auto price = catalog.price_for(name);
        if (!price) return std::nullopt;
        return create(name, quantity, *price);
    }

    bool operator==(const OrderItem& o) const {
        return name == o.name && quantity == o.quantity
            && price == o.price && item_total == o.item_total;
    }
};

constexpr int kOrderItemCollectionMinimum = 0;
constexpr int kOrderItemCollectionMaximum = 100;

class OrderItemCollection {
public:
    void add(const OrderItem& item) { items_.push_back(item); }
    const std::vector<OrderItem>& read() const { return items_; }
    std::size_t size() const { return items_.size(); }

    Dollar compute_total() const {
        Dollar total;
        for (const auto& i : items_) total = total.plus(i.item_total);
        return total;
    }

    bool operator==(const OrderItemCollection& o) const { return items_ == o.items_; }

private:
    std::vector<OrderItem> items_;
};

class ShoppingCart {
public:
    explicit ShoppingCart(OrderItemCollection items) : items_(std::move(items)) {}

    // --- the two business rules -------------------------------------------

    /// Free once the order reaches $100, otherwise a flat $5.
    static Dollar shipping_cost_for(const Dollar& total_price) {
        return total_price.cents() >= 10000 ? Dollar(0LL) : Dollar(500LL);
    }

    /// Tiered: under $25 nothing, to $99.99 five percent, $100 up ten.
    static Percentage discount_for(const Dollar& total_price) {
        if (total_price.cents() >= 10000) return Percentage(10);
        if (total_price.cents() >= 2500) return Percentage(5);
        return Percentage(0);
    }

    // --- the Total Cart Price rule, over a bare item total ----------------
    //
    // Stated as functions of the item total so the rule can be checked straight
    // from its Examples table, which gives a TotalItems figure and no items.
    // "Discount applied before shipping calculated", per that table's own note.

    /// The discount as money: the tiered percentage of the item total.
    static Dollar discount_amount_for(const Dollar& total_items) {
        return total_items.percent_of(discount_for(total_items));
    }

    /// Shipping is judged on what the customer pays, so after the discount.
    static Dollar shipping_for(const Dollar& total_items) {
        return shipping_cost_for(total_items.minus(discount_amount_for(total_items)));
    }

    /// Item total, less the discount, plus shipping.
    static Dollar total_price_for(const Dollar& total_items) {
        return total_items.minus(discount_amount_for(total_items))
                          .plus(shipping_for(total_items));
    }

    // --- what this cart comes to ------------------------------------------

    /// What the items come to before any discount or shipping.
    Dollar subtotal() const { return items_.compute_total(); }

    Dollar discount_amount() const { return discount_amount_for(subtotal()); }

    Dollar shipping_cost() const { return shipping_for(subtotal()); }

    Dollar compute_total() const { return total_price_for(subtotal()); }

private:
    OrderItemCollection items_;
};
