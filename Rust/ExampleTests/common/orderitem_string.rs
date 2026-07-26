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
}

impl std::fmt::Display for OrderItemString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Name={}, Quantity={}, Price={}, ItemTotal={}",
            self.name,
            self.quantity,
            self.price,
            self.itemtotal
        )
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
