import pytest
from common import *
from shopping_cart_glue import ShoppingCartGlue

def test_Scenario_AddItems():
    glue = ShoppingCartGlue()

    object_list_1 = [
        CatalogItemString('Widget', '10'),
        CatalogItemString('WhatCallIt', '20'),
        CatalogItemString('ThingaMaJig', '30'),
    ]
    glue.given_catalog_has(object_list_1)

    object_list_2 = [
    ]
    glue.given_item_collection_is(object_list_2)

    object_list_3 = [
        OrderItemString('Widget', '2', '1', '1'),
    ]
    glue.when_item_added(object_list_3)

    object_list_4 = [
        OrderItemString('Widget', '2', '$10.00', '$20.00'),
    ]
    glue.then_item_collection_is(object_list_4)

    object_list_5 = [
        OrderItemString('WhatCallIt', '3', '1', '1'),
    ]
    glue.when_item_added(object_list_5)

    object_list_6 = [
        OrderItemString('Widget', '2', '$10.00', '$20.00'),
        OrderItemString('WhatCallIt', '3', '$20.00', '$60.00'),
    ]
    glue.then_item_collection_is(object_list_6)


def test_Scenario_AShoppingCartWithAddresses():
    glue = ShoppingCartGlue()

    object_list_7 = [
        CatalogItemString('Widget', '10'),
        CatalogItemString('WhatCallIt', '20'),
        CatalogItemString('ThingaMaJig', '30'),
    ]
    glue.given_catalog_has(object_list_7)

    object_list_8 = [
        ShoppingCartString('=EmptyCart', '$0', '$0', '$0', AddressString('2 Apple Lane', 'Somewhere', 'NC', '27706'), AddressString('1 Apple Lane', 'Somewhere', 'NC', '27705')),
    ]
    glue.given_shopping_cart(object_list_8)


def test_Scenario_AddItemsToShoppingCart():
    glue = ShoppingCartGlue()

    object_list_9 = [
        CatalogItemString('Widget', '10'),
        CatalogItemString('WhatCallIt', '20'),
        CatalogItemString('ThingaMaJig', '30'),
    ]
    glue.given_catalog_has(object_list_9)

    object_list_10 = [
        ShoppingCartString('=EmptyCart', '$0', '$0', '$0', AddressString('', '', '', ''), AddressString('', '', '', '')),
    ]
    glue.given_shopping_cart(object_list_10)

    object_list_11 = [
        OrderItemString('Widget', '2', '1', '1'),
    ]
    glue.when_item_added(object_list_11)

    object_list_12 = [
        OrderItemString('WhatCallIt', '3', '1', '1'),
    ]
    glue.when_item_added(object_list_12)

    object_list_13 = [
        ShoppingCartString('=TwoItemCart', '$5', '$4', '$81', AddressString('', '', '', ''), AddressString('', '', '', '')),
    ]
    glue.then_shopping_cart_is(object_list_13)


def test_Scenario_CostOfEmptyOrderItemCollection():
    glue = ShoppingCartGlue()

    object_list_14 = [
        CatalogItemString('Widget', '10'),
        CatalogItemString('WhatCallIt', '20'),
        CatalogItemString('ThingaMaJig', '30'),
    ]
    glue.given_catalog_has(object_list_14)

    object_list_15 = [
    ]
    glue.given_item_collection(object_list_15)

    glue.when_total_computed()

    object_list_16 = [
        PricingString('$0'),
    ]
    glue.then_result_is(object_list_16)


# --- BusinessRule Tests ---

def test_BusinessRule_ShippingCost():
    glue = ShoppingCartGlue()
    object_list_17 = [
        ShippingString('$99.99', '$5.00', 'Less than $100'),
        ShippingString('$100.00', '$0', 'Free if $100 or more'),
    ]
    glue.examples_BusinessRule_ShippingCost(object_list_17)

def test_BusinessRule_Discount():
    glue = ShoppingCartGlue()
    object_list_18 = [
        DiscountingString('$24.99', '0', ''),
        DiscountingString('$25.00', '5', ''),
        DiscountingString('$99.99', '5', ''),
        DiscountingString('$100.00', '10', ''),
    ]
    glue.examples_BusinessRule_Discount(object_list_18)

# --- DataType Tests ---

def test_DataType_Percentage():
    glue = ShoppingCartGlue()
    object_list_19 = [
        ValidValuesString('0', 'y', ''),
        ValidValuesString('99', 'y', ''),
        ValidValuesString('100', 'y', ''),
        ValidValuesString('101', 'n', ''),
        ValidValuesString('-1', 'n', ''),
    ]
    glue.examples_DataType_Percentage(object_list_19)

