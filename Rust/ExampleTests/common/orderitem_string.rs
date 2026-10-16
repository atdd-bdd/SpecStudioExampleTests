#![allow(dead_code, unused_imports, unused_variables)]

use super::simpletext_string::SimpleTextString;
use super::dollar_string::DollarString;
#[derive(Debug, Clone, Default)]
pub struct OrderItemString {
    pub name: SimpleTextString,
    pub quantity: String,
    pub price: DollarString,
    pub itemtotal: DollarString,
}

impl OrderItemString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            name: SimpleTextString::from(v.get(0).copied().unwrap_or("")),
            quantity: v.get(1).copied().unwrap_or("").to_string(),
            price: DollarString::from(v.get(2).copied().unwrap_or("")),
            itemtotal: DollarString::from(v.get(3).copied().unwrap_or("")),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 4, "OrderItem");
        Self {
            name: SimpleTextString::from(parts[0].clone()),
            quantity: parts[1].clone(),
            price: DollarString::from(parts[2].clone()),
            itemtotal: DollarString::from(parts[3].clone()),
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
