#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ShippingInputString {
    pub total_price: String,
    pub shipping_cost: String,
    pub notes: String,
}

impl ShippingInputString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            total_price: v.get(0).copied().unwrap_or("").to_string(),
            shipping_cost: v.get(1).copied().unwrap_or("").to_string(),
            notes: v.get(2).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 3, "ShippingInput");
        Self {
            total_price: parts[0].clone(),
            shipping_cost: parts[1].clone(),
            notes: parts[2].clone(),
        }
    }
}

impl std::fmt::Display for ShippingInputString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.total_price), crate::common::tokens::token(&self.shipping_cost), crate::common::tokens::token(&self.notes)].join(" "))
    }
}

impl PartialEq for ShippingInputString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.total_price, &other.total_price)
            && crate::common::dnc_equal(&self.shipping_cost, &other.shipping_cost)
            && crate::common::dnc_equal(&self.notes, &other.notes)
    }
}
