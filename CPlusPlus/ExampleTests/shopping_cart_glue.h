#pragma once
#include <gtest/gtest.h>
#include <stdexcept>
#include <string>
#include <vector>
#include "common/common.h"
#include "production/domain.h"

class ShoppingCartGlue {
public:
    void given_catalog_has(const std::vector<CatalogItemString>& values) {
        for (const auto& value : values) {
            const CatalogItemTyped t = CatalogItemTyped::from_string_struct(value);
            catalog_.add(CatalogItem(SimpleText::unchecked(t.name), Dollar(t.price)));
        }
    }

    void given_item_collection_is(const std::vector<OrderItemString>& values) {
        given_item_collection(values);
    }

    void given_item_collection(const std::vector<OrderItemString>& values) {
        items_ = OrderItemCollection();
        for (const auto& value : values) {
            const OrderItemTyped t = OrderItemTyped::from_string_struct(value);
            items_.add(OrderItem(SimpleText::unchecked(t.name), t.quantity,
                                 Dollar(t.price), Dollar(t.itemtotal)));
        }
    }

    void when_item_added(const std::vector<OrderItemString>& values) {
        for (const auto& value : values) {
            const OrderItemTyped t = OrderItemTyped::from_string_struct(value);
            auto item = OrderItem::from_catalog(
                catalog_, SimpleText::unchecked(t.name), t.quantity);
            ASSERT_TRUE(item.has_value()) << "item not in catalog: " << t.name;
            items_.add(*item);
        }
    }

    void then_item_collection_is(const std::vector<OrderItemString>& values) {
        const auto& actual = items_.read();
        ASSERT_EQ(values.size(), actual.size()) << "Item count";
        for (std::size_t i = 0; i < values.size(); ++i) {
            const OrderItemTyped t = OrderItemTyped::from_string_struct(values[i]);
            EXPECT_EQ(t.name, actual[i].name.value()) << "Item " << i << " name";
            EXPECT_EQ(t.quantity, actual[i].quantity) << "Item " << i << " quantity";
            EXPECT_EQ(Dollar(t.price), actual[i].price) << "Item " << i << " price";
            EXPECT_EQ(Dollar(t.itemtotal), actual[i].item_total)
                << "Item " << i << " itemTotal";
        }
    }

    void given_shopping_cart(const std::vector<ShoppingCartString>& values) {
        // Every scenario starts from =EmptyCart, which carries no data rows, so
        // begin with a fresh collection rather than resolving the Define.
        items_ = OrderItemCollection();
    }

    void then_shopping_cart_is(const std::vector<ShoppingCartString>& values) {
        for (const auto& value : values) {
            const ShoppingCartTyped t = ShoppingCartTyped::from_string_struct(value);
            const ShoppingCart cart(items_);
            // Shipping and Discount are outcomes of the two business rules, not
            // the values the Given supplied, so ask the cart for them.
            EXPECT_EQ(Dollar(t.totalprice), cart.compute_total()) << "TotalPrice";
            EXPECT_EQ(Dollar(t.shipping), cart.shipping_cost()) << "Shipping";
            EXPECT_EQ(Dollar(t.discount), cart.discount_amount()) << "Discount";
        }
    }

    void when_total_computed() { computed_total_ = items_.compute_total(); }


    void examples_businessrule_shipping_cost(const std::vector<ShippingInputString>& values) {
        for (const auto& value : values) {
            const ShippingInputTyped t = ShippingInputTyped::from_string_struct(value);
            EXPECT_EQ(Dollar(t.shipping_cost),
                      ShoppingCart::shipping_cost_for(Dollar(t.total_price)))
                << "Shipping cost for " << t.total_price;
        }
    }

    void examples_businessrule_discount(const std::vector<DiscountInputString>& values) {
        for (const auto& value : values) {
            const DiscountInputTyped t = DiscountInputTyped::from_string_struct(value);
            EXPECT_EQ(Percentage(t.discount),
                      ShoppingCart::discount_for(Dollar(t.total_price)))
                << "Discount for " << t.total_price;
        }
    }

    void examples_datatype_percentage(const std::vector<ValidValuesString>& values) {
        for (const auto& value : values) {
            const ValidValuesTyped vvt = ValidValuesTyped::from_string_struct(value);
            bool failed = false;
            try { Percentage p(vvt.value); } catch (const std::invalid_argument&) { failed = true; }
            EXPECT_EQ(vvt.isvalid, !failed) << " Value " << vvt.value;
        }
    }

    void then_total_of_items_is(const std::vector<ItemPriceInputString>& values) {
        for (const auto& value : values) {
            const ItemPriceInputTyped t = ItemPriceInputTyped::from_string_struct(value);
            EXPECT_EQ(Dollar(t.totalitems), items_.compute_total()) << "TotalItems";
        }
    }

    void examples_businessrule_total_cart_price(const std::vector<CartInputString>& values) {
        for (const auto& value : values) {
            const CartInputTyped t = CartInputTyped::from_string_struct(value);
            // The rule states the whole calculation from an item total, so drive
            // it that way rather than building a cart to reach the same numbers.
            const Dollar total(t.totalitems);
            EXPECT_EQ(Dollar(t.discount), ShoppingCart::discount_amount_for(total))
                << "Discount for " << t.totalitems;
            EXPECT_EQ(Dollar(t.shipping), ShoppingCart::shipping_for(total))
                << "Shipping for " << t.totalitems;
            EXPECT_EQ(Dollar(t.total_price), ShoppingCart::total_price_for(total))
                << "Total Price for " << t.totalitems;
        }
    }

private:
    Catalog catalog_;
    OrderItemCollection items_;
    Dollar computed_total_;


};
