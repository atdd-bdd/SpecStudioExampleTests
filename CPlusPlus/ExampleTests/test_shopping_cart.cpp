#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "shopping_cart_glue.h"

TEST(ShoppingCart, Scenario_AddItems) {
    ShoppingCartGlue glue;
    std::vector<CatalogItemString> objectList1 = {
        CatalogItemString::from_vec({"Widget", "10"}),
        CatalogItemString::from_vec({"WhatCallIt", "20"}),
        CatalogItemString::from_vec({"ThingaMaJig", "30"}),
    };
    glue.given_catalog_has(objectList1);

    std::vector<OrderItemString> objectList2 = {
    };
    glue.given_item_collection_is(objectList2);

    std::vector<OrderItemString> objectList3 = {
        OrderItemString::from_vec({"Widget", "2", "1", "1"}),
    };
    glue.when_item_added(objectList3);

    std::vector<OrderItemString> objectList4 = {
        OrderItemString::from_vec({"Widget", "2", "$10.00", "$20.00"}),
    };
    glue.then_item_collection_is(objectList4);

    std::vector<OrderItemString> objectList5 = {
        OrderItemString::from_vec({"WhatCallIt", "3", "1", "1"}),
    };
    glue.when_item_added(objectList5);

    std::vector<OrderItemString> objectList6 = {
        OrderItemString::from_vec({"Widget", "2", "$10.00", "$20.00"}),
        OrderItemString::from_vec({"WhatCallIt", "3", "$20.00", "$60.00"}),
    };
    glue.then_item_collection_is(objectList6);

    std::vector<ItemPriceInputString> objectList7 = {
        ItemPriceInputString::from_vec({"$80"}),
    };
    glue.then_total_of_items_is(objectList7);

}

TEST(ShoppingCart, Scenario_AShoppingCartWithAddresses) {
    ShoppingCartGlue glue;
    std::vector<CatalogItemString> objectList8 = {
        CatalogItemString::from_vec({"Widget", "10"}),
        CatalogItemString::from_vec({"WhatCallIt", "20"}),
        CatalogItemString::from_vec({"ThingaMaJig", "30"}),
    };
    glue.given_catalog_has(objectList8);

    std::vector<ShoppingCartString> objectList9 = {
        ShoppingCartString{"=EmptyCart", "$0", "$0", "$0", AddressString{"2 Apple Lane", "Somewhere", "NC", "27706"}, AddressString{"1 Apple Lane", "Somewhere", "NC", "27705"}},
    };
    glue.given_shopping_cart(objectList9);

}

TEST(ShoppingCart, Scenario_AddItemsToShoppingCart) {
    ShoppingCartGlue glue;
    std::vector<CatalogItemString> objectList10 = {
        CatalogItemString::from_vec({"Widget", "10"}),
        CatalogItemString::from_vec({"WhatCallIt", "20"}),
        CatalogItemString::from_vec({"ThingaMaJig", "30"}),
    };
    glue.given_catalog_has(objectList10);

    std::vector<ShoppingCartString> objectList11 = {
        ShoppingCartString{"=EmptyCart", "$0", "$0", "$0", AddressString{"", "", "", ""}, AddressString{"", "", "", ""}},
    };
    glue.given_shopping_cart(objectList11);

    std::vector<OrderItemString> objectList12 = {
        OrderItemString::from_vec({"Widget", "2", "1", "1"}),
    };
    glue.when_item_added(objectList12);

    std::vector<OrderItemString> objectList13 = {
        OrderItemString::from_vec({"WhatCallIt", "3", "1", "1"}),
    };
    glue.when_item_added(objectList13);

    std::vector<ShoppingCartString> objectList14 = {
        ShoppingCartString{"=TwoItemCart", "$5", "$4", "$81", AddressString{"", "", "", ""}, AddressString{"", "", "", ""}},
    };
    glue.then_shopping_cart_is(objectList14);

}

TEST(ShoppingCart, Scenario_CostOfEmptyOrderItemCollection) {
    ShoppingCartGlue glue;
    std::vector<CatalogItemString> objectList15 = {
        CatalogItemString::from_vec({"Widget", "10"}),
        CatalogItemString::from_vec({"WhatCallIt", "20"}),
        CatalogItemString::from_vec({"ThingaMaJig", "30"}),
    };
    glue.given_catalog_has(objectList15);

    std::vector<OrderItemString> objectList16 = {
    };
    glue.given_item_collection(objectList16);

    std::vector<ItemPriceInputString> objectList17 = {
        ItemPriceInputString::from_vec({"$0"}),
    };
    glue.then_total_of_items_is(objectList17);

}

TEST(ShoppingCart, BusinessRule_TotalCartPrice) {
    ShoppingCartGlue glue;
    std::vector<CartInputString> objectList18 = {
        CartInputString::from_vec({"$110", "$5", "$11", "$104", "Discount applied before shipping calculated"}),
        CartInputString::from_vec({"$80", "$5", "$4", "$81", ""}),
    };
    glue.examples_businessrule_total_cart_price(objectList18);
}

TEST(ShoppingCart, BusinessRule_ShippingCost) {
    ShoppingCartGlue glue;
    std::vector<ShippingInputString> objectList19 = {
        ShippingInputString::from_vec({"$99.99", "$5.00", "Less than $100"}),
        ShippingInputString::from_vec({"$100.00", "$0", "Free if $100 or more"}),
    };
    glue.examples_businessrule_shipping_cost(objectList19);
}

TEST(ShoppingCart, BusinessRule_Discount) {
    ShoppingCartGlue glue;
    std::vector<DiscountInputString> objectList20 = {
        DiscountInputString::from_vec({"$24.99", "0", ""}),
        DiscountInputString::from_vec({"$25.00", "5", ""}),
        DiscountInputString::from_vec({"$99.99", "5", ""}),
        DiscountInputString::from_vec({"$100.00", "10", ""}),
    };
    glue.examples_businessrule_discount(objectList20);
}

TEST(ShoppingCart, DataType_Percentage) {
    ShoppingCartGlue glue;
    std::vector<ValidValuesString> objectList21 = {
        ValidValuesString::from_vec({"0", "y", ""}),
        ValidValuesString::from_vec({"99", "y", ""}),
        ValidValuesString::from_vec({"100", "y", ""}),
        ValidValuesString::from_vec({"101", "n", ""}),
        ValidValuesString::from_vec({"-1", "n", ""}),
    };
    glue.examples_datatype_percentage(objectList21);
}

