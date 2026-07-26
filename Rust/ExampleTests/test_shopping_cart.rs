#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use super::shopping_cart_glue::ShoppingCartGlue;

// --- Scenario Tests ---

#[test]
fn scenario_add_items() {
    let mut glue = ShoppingCartGlue::new();
    glue.given_catalog_has(&[
        CatalogItemString::from_vec(&["Widget", "10"]),
        CatalogItemString::from_vec(&["WhatCallIt", "20"]),
        CatalogItemString::from_vec(&["ThingaMaJig", "30"]),
    ]);
    glue.given_item_collection_is(&[
    ]);
    glue.when_item_added(&[OrderItemString::from_vec(&["Widget", "2", "1", "1"])]);
    glue.then_item_collection_is(&[OrderItemString::from_vec(&["Widget", "2", "$10.00", "$20.00"])]);
    glue.when_item_added(&[OrderItemString::from_vec(&["WhatCallIt", "3", "1", "1"])]);
    glue.then_item_collection_is(&[
        OrderItemString::from_vec(&["Widget", "2", "$10.00", "$20.00"]),
        OrderItemString::from_vec(&["WhatCallIt", "3", "$20.00", "$60.00"]),
    ]);
    glue.then_total_of_items_is(&[ItemPriceInputString::from_vec(&["$80"])]);
}

#[test]
fn scenario_a_shoppingcart_with_addresses() {
    let mut glue = ShoppingCartGlue::new();
    glue.given_catalog_has(&[
        CatalogItemString::from_vec(&["Widget", "10"]),
        CatalogItemString::from_vec(&["WhatCallIt", "20"]),
        CatalogItemString::from_vec(&["ThingaMaJig", "30"]),
    ]);
    glue.given_shopping_cart(&[ShoppingCartString { items: "=EmptyCart".to_string(), shipping: "$0".to_string(), discount: "$0".to_string(), totalprice: "$0".to_string(), shippingaddress: AddressString { street: "2 Apple Lane".to_string(), city: "Somewhere".to_string(), state: "NC".to_string(), zip: "27706".to_string() }, billingaddress: AddressString { street: "1 Apple Lane".to_string(), city: "Somewhere".to_string(), state: "NC".to_string(), zip: "27705".to_string() } }]);
}

#[test]
fn scenario_add_items_to_shopping_cart() {
    let mut glue = ShoppingCartGlue::new();
    glue.given_catalog_has(&[
        CatalogItemString::from_vec(&["Widget", "10"]),
        CatalogItemString::from_vec(&["WhatCallIt", "20"]),
        CatalogItemString::from_vec(&["ThingaMaJig", "30"]),
    ]);
    glue.given_shopping_cart(&[ShoppingCartString { items: "=EmptyCart".to_string(), shipping: "$0".to_string(), discount: "$0".to_string(), totalprice: "$0".to_string(), shippingaddress: AddressString { street: "".to_string(), city: "".to_string(), state: "".to_string(), zip: "".to_string() }, billingaddress: AddressString { street: "".to_string(), city: "".to_string(), state: "".to_string(), zip: "".to_string() } }]);
    glue.when_item_added(&[OrderItemString::from_vec(&["Widget", "2", "1", "1"])]);
    glue.when_item_added(&[OrderItemString::from_vec(&["WhatCallIt", "3", "1", "1"])]);
    glue.then_shopping_cart_is(&[ShoppingCartString { items: "=TwoItemCart".to_string(), shipping: "$5".to_string(), discount: "$4".to_string(), totalprice: "$81".to_string(), shippingaddress: AddressString { street: "".to_string(), city: "".to_string(), state: "".to_string(), zip: "".to_string() }, billingaddress: AddressString { street: "".to_string(), city: "".to_string(), state: "".to_string(), zip: "".to_string() } }]);
}

#[test]
fn scenario_cost_of_empty_orderitemcollection() {
    let mut glue = ShoppingCartGlue::new();
    glue.given_catalog_has(&[
        CatalogItemString::from_vec(&["Widget", "10"]),
        CatalogItemString::from_vec(&["WhatCallIt", "20"]),
        CatalogItemString::from_vec(&["ThingaMaJig", "30"]),
    ]);
    glue.given_item_collection(&[
    ]);
    glue.then_total_of_items_is(&[ItemPriceInputString::from_vec(&["$0"])]);
}

// --- BusinessRule Tests ---

#[test]
fn business_rule_total_cart_price() {
    let mut glue = ShoppingCartGlue::new();
    glue.examples_business_rule_total_cart_price(&[
        CartInputString::from_vec(&["$110", "$5", "$11", "$104", "Discount applied before shipping calculated"]),
        CartInputString::from_vec(&["$80", "$5", "$4", "$81", ""]),
    ]);
}

#[test]
fn business_rule_shipping_cost() {
    let mut glue = ShoppingCartGlue::new();
    glue.examples_business_rule_shipping_cost(&[
        ShippingInputString::from_vec(&["$99.99", "$5.00", "Less than $100"]),
        ShippingInputString::from_vec(&["$100.00", "$0", "Free if $100 or more"]),
    ]);
}

#[test]
fn business_rule_discount() {
    let mut glue = ShoppingCartGlue::new();
    glue.examples_business_rule_discount(&[
        DiscountInputString::from_vec(&["$24.99", "0", ""]),
        DiscountInputString::from_vec(&["$25.00", "5", ""]),
        DiscountInputString::from_vec(&["$99.99", "5", ""]),
        DiscountInputString::from_vec(&["$100.00", "10", ""]),
    ]);
}

// --- DataType Tests ---

#[test]
fn data_type_percentage() {
    let mut glue = ShoppingCartGlue::new();
    glue.examples_data_type_percentage(&[
        ValidValuesString::from_vec(&["0", "y", ""]),
        ValidValuesString::from_vec(&["99", "y", ""]),
        ValidValuesString::from_vec(&["100", "y", ""]),
        ValidValuesString::from_vec(&["101", "n", ""]),
        ValidValuesString::from_vec(&["-1", "n", ""]),
    ]);
}

