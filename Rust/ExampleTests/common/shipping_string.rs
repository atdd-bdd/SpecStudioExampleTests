#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ShippingString {
    pub total_price: String,
    pub shipping_cost: String,
    pub notes: String,
}

impl ShippingString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            total_price: v.get(0).copied().unwrap_or("").to_string(),
            shipping_cost: v.get(1).copied().unwrap_or("").to_string(),
            notes: v.get(2).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for ShippingString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Total Price={}, Shipping Cost={}, Notes={}",
            self.total_price,
            self.shipping_cost,
            self.notes
        )
    }
}
