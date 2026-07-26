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

    // --- the Total Cart Price rule, over a bare item total -----------------
    //
    // Stated as functions of the item total so the rule can be checked straight
    // from its Examples table, which gives a TotalItems figure and no items.
    // "Discount applied before shipping calculated", per that table's own note.

    /// The discount as money: the tiered percentage of the item total.
    pub fn discount_amount_for(total_items: &Dollar) -> Dollar {
        total_items.percent_of(&Self::discount_for(total_items))
    }

    /// Shipping is judged on what the customer pays, so after the discount.
    pub fn shipping_for(total_items: &Dollar) -> Dollar {
        Self::shipping_cost_for(&total_items.minus(&Self::discount_amount_for(total_items)))
    }

    /// Item total, less the discount, plus shipping.
    pub fn total_price_for(total_items: &Dollar) -> Dollar {
        total_items.minus(&Self::discount_amount_for(total_items))
                   .plus(&Self::shipping_for(total_items))
    }

    // --- what this cart comes to ------------------------------------------

    /// What the items come to before any discount or shipping.
    pub fn subtotal(&self) -> Dollar { self.items.compute_total() }

    pub fn discount_amount(&self) -> Dollar {
        Self::discount_amount_for(&self.subtotal())
    }

    pub fn shipping_cost(&self) -> Dollar {
        Self::shipping_for(&self.subtotal())
    }

    pub fn compute_total(&self) -> Dollar {
        Self::total_price_for(&self.subtotal())
    }
}
