use super::*;

#[derive(Debug, Clone, PartialEq)]
pub struct ShoppingCart {
    pub items: OrderItemCollection,
    pub shipping_address: Address,
    pub billing_address: Address,
}

impl ShoppingCart {
    pub fn new(items: OrderItemCollection) -> Self {
        Self { items, shipping_address: Address::default(),
               billing_address: Address::default() }
    }

    // --- the two business rules -------------------------------------------

    /// Free once the order reaches $100, otherwise a flat $5.
    pub fn shipping_cost_for(total_price: &Dollar) -> Dollar {
        if total_price.cents() >= 10_000 { Dollar::from_cents(0) }
        else { Dollar::from_cents(500) }
    }

    /// Tiered: under $25 nothing, to $99.99 five percent, $100 up ten.
    pub fn discount_for(total_price: &Dollar) -> Percentage {
        let cents = total_price.cents();
        if cents >= 10_000 { Percentage::new(10) }
        else if cents >= 2_500 { Percentage::new(5) }
        else { Percentage::new(0) }
    }

    // --- what the cart comes to -------------------------------------------

    /// What the items come to before any discount or shipping.
    pub fn subtotal(&self) -> Dollar { self.items.compute_total() }

    /// The discount as money: the tiered percentage of the subtotal.
    pub fn discount_amount(&self) -> Dollar {
        let amount = self.subtotal();
        amount.percent_of(&Self::discount_for(&amount))
    }

    /// Shipping is charged on what the customer actually pays, so the discount
    /// comes off before the $100 threshold is tested — following the scenario's
    /// "Apply Discount to OrderItem Total, then add shipping".
    pub fn shipping_cost(&self) -> Dollar {
        Self::shipping_cost_for(&self.subtotal().minus(&self.discount_amount()))
    }

    /// Subtotal, less the discount, plus shipping.
    pub fn compute_total(&self) -> Dollar {
        self.subtotal().minus(&self.discount_amount()).plus(&self.shipping_cost())
    }
}
