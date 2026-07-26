#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;

pub struct ShoppingCartGlue {
    // Add state fields here
}

impl ShoppingCartGlue {
    pub fn new() -> Self {
        Self {}
    }

    pub fn given_catalog_has(&mut self, values: &[CatalogItemString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: given_catalog_has");
    }

    pub fn given_item_collection_is(&mut self, values: &[OrderItemString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: given_item_collection_is");
    }

    pub fn when_item_added(&mut self, values: &[OrderItemString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: when_item_added");
    }

    pub fn then_item_collection_is(&mut self, values: &[OrderItemString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: then_item_collection_is");
    }

    pub fn given_shopping_cart(&mut self, values: &[ShoppingCartString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: given_shopping_cart");
    }

    pub fn then_shopping_cart_is(&mut self, values: &[ShoppingCartString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: then_shopping_cart_is");
    }

    pub fn given_item_collection(&mut self, values: &[OrderItemString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: given_item_collection");
    }

    pub fn when_total_computed(&mut self) {
        panic!("Not implemented: when_total_computed");
    }

    pub fn then_result_is(&mut self, values: &[PricingString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: then_result_is");
    }

    pub fn examples_business_rule_shipping_cost(&mut self, values: &[ShippingString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: examples_business_rule_shipping_cost");
    }

    pub fn examples_business_rule_discount(&mut self, values: &[DiscountingString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: examples_business_rule_discount");
    }

    pub fn examples_data_type_percentage(&mut self, values: &[ValidValuesString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: examples_data_type_percentage");
    }
}
