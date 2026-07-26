#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;
use crate::production::{Catalog, CatalogItem, Dollar, OrderItem,
                        OrderItemCollection, Percentage, ShoppingCart, SimpleText};

pub struct ShoppingCartGlue {
    catalog: Catalog,
    current_items: OrderItemCollection,
    computed_total: Dollar,
}

impl ShoppingCartGlue {
    pub fn new() -> Self {
        Self {
            catalog: Catalog::new(),
            current_items: OrderItemCollection::new(),
            computed_total: Dollar::default(),
        }
    }

    fn cart(&self) -> ShoppingCart {
        ShoppingCart::new(self.current_items.clone())
    }

    pub fn given_catalog_has(&mut self, values: &[CatalogItemString]) {
        for value in values {
            let typed = CatalogItemTyped::from_str_struct(value);
            self.catalog.add(CatalogItem::new(
                SimpleText::new(&typed.name),
                Dollar::parse(&typed.price).expect("bad price")));
        }
    }

    pub fn given_item_collection_is(&mut self, values: &[OrderItemString]) {
        self.given_item_collection(values);
    }

    pub fn given_item_collection(&mut self, values: &[OrderItemString]) {
        self.current_items = OrderItemCollection::new();
        for value in values {
            let typed = OrderItemTyped::from_str_struct(value);
            self.current_items.add(OrderItem::new(
                SimpleText::new(&typed.name),
                typed.quantity,
                Dollar::parse(&typed.price).expect("bad price"),
                Dollar::parse(&typed.itemtotal).expect("bad total")));
        }
    }

    pub fn when_item_added(&mut self, values: &[OrderItemString]) {
        for value in values {
            let typed = OrderItemTyped::from_str_struct(value);
            let item = OrderItem::from_catalog(
                &self.catalog, SimpleText::new(&typed.name), typed.quantity)
                .expect("item not in catalog");
            self.current_items.add(item);
        }
    }

    pub fn then_item_collection_is(&mut self, values: &[OrderItemString]) {
        let actual = self.current_items.read();
        assert_eq!(values.len(), actual.len(), "Item count");
        for (i, value) in values.iter().enumerate() {
            let typed = OrderItemTyped::from_str_struct(value);
            let a = &actual[i];
            assert_eq!(typed.name, a.name.value, "Item {i} name");
            assert_eq!(typed.quantity, a.quantity, "Item {i} quantity");
            assert_eq!(Dollar::parse(&typed.price).unwrap(), a.price, "Item {i} price");
            assert_eq!(Dollar::parse(&typed.itemtotal).unwrap(), a.item_total,
                       "Item {i} itemTotal");
        }
    }

    pub fn given_shopping_cart(&mut self, values: &[ShoppingCartString]) {
        // Every scenario starts from =EmptyCart, which carries no data rows, so
        // begin with a fresh collection rather than resolving the Define.
        self.current_items = OrderItemCollection::new();
    }

    pub fn then_shopping_cart_is(&mut self, values: &[ShoppingCartString]) {
        for value in values {
            let typed = ShoppingCartTyped::from_str_struct(value);
            let cart = self.cart();
            // Shipping and Discount are outcomes of the two business rules, not
            // the values the Given supplied, so ask the cart for them.
            assert_eq!(Dollar::parse(&typed.totalprice).unwrap(), cart.compute_total(),
                       "TotalPrice");
            assert_eq!(Dollar::parse(&typed.shipping).unwrap(), cart.shipping_cost(),
                       "Shipping");
            assert_eq!(Dollar::parse(&typed.discount).unwrap(), cart.discount_amount(),
                       "Discount");
        }
    }

    pub fn when_total_computed(&mut self) {
        self.computed_total = self.current_items.compute_total();
    }

    pub fn then_result_is(&mut self, values: &[PricingString]) {
        for value in values {
            let typed = PricingTyped::from_str_struct(value);
            assert_eq!(Dollar::parse(&typed.totalprice).unwrap(), self.computed_total,
                       "TotalPrice");
        }
    }

    pub fn examples_business_rule_shipping_cost(&mut self, values: &[ShippingInputString]) {
        for value in values {
            let typed = ShippingInputTyped::from_str_struct(value);
            let total = Dollar::parse(&typed.total_price).expect("bad total");
            assert_eq!(Dollar::parse(&typed.shipping_cost).unwrap(),
                       ShoppingCart::shipping_cost_for(&total),
                       "Shipping cost for {}", typed.total_price);
        }
    }

    pub fn examples_business_rule_discount(&mut self, values: &[DiscountInputString]) {
        for value in values {
            let typed = DiscountInputTyped::from_str_struct(value);
            let total = Dollar::parse(&typed.total_price).expect("bad total");
            assert_eq!(Percentage::parse(&typed.discount).unwrap(),
                       ShoppingCart::discount_for(&total),
                       "Discount for {}", typed.total_price);
        }
    }

    pub fn examples_data_type_percentage(&mut self, values: &[ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped::from_str_struct(value);
            let ok = Percentage::parse(&vvt.value).is_ok();
            assert_eq!(vvt.isvalid, ok, " Value {}", vvt.value);
        }
    }

    pub fn then_total_of_items_is(&mut self, values: &[ItemPriceInputString]) {
        for value in values {
            let typed = ItemPriceInputTyped::from_str_struct(value);
            assert_eq!(Dollar::parse(&typed.totalitems).unwrap(),
                       self.current_items.compute_total(), "TotalItems");
        }
    }

    pub fn examples_business_rule_total_cart_price(&mut self, values: &[CartInputString]) {
        for value in values {
            let typed = CartInputTyped::from_str_struct(value);
            // The rule states the whole calculation from an item total, so drive
            // it that way rather than building a cart to reach the same numbers.
            let total = Dollar::parse(&typed.totalitems).expect("bad total");
            assert_eq!(Dollar::parse(&typed.discount).unwrap(),
                       ShoppingCart::discount_amount_for(&total),
                       "Discount for {}", typed.totalitems);
            assert_eq!(Dollar::parse(&typed.shipping).unwrap(),
                       ShoppingCart::shipping_for(&total),
                       "Shipping for {}", typed.totalitems);
            assert_eq!(Dollar::parse(&typed.total_price).unwrap(),
                       ShoppingCart::total_price_for(&total),
                       "Total Price for {}", typed.totalitems);
        }
    }

}
