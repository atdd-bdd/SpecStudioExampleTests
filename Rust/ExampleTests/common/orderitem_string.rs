#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct OrderItemString {
    pub name: String,
    pub quantity: String,
    pub price: String,
    pub itemtotal: String,
}

impl OrderItemString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            name: v.get(0).copied().unwrap_or("").to_string(),
            quantity: v.get(1).copied().unwrap_or("").to_string(),
            price: v.get(2).copied().unwrap_or("").to_string(),
            itemtotal: v.get(3).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 4, "OrderItem");
        Self {
            name: parts[0].clone(),
            quantity: parts[1].clone(),
            price: parts[2].clone(),
            itemtotal: parts[3].clone(),
        }
    }
}

impl std::fmt::Display for OrderItemString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.name), crate::common::tokens::token(&self.quantity), crate::common::tokens::token(&self.price), crate::common::tokens::token(&self.itemtotal)].join(" "))
    }
}

impl PartialEq for OrderItemString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.name, &other.name)
            && crate::common::dnc_equal(&self.quantity, &other.quantity)
            && crate::common::dnc_equal(&self.price, &other.price)
            && crate::common::dnc_equal(&self.itemtotal, &other.itemtotal)
    }
}
