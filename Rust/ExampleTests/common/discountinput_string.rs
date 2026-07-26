#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct DiscountInputString {
    pub total_price: String,
    pub discount: String,
    pub notes: String,
}

impl DiscountInputString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            total_price: v.get(0).copied().unwrap_or("").to_string(),
            discount: v.get(1).copied().unwrap_or("").to_string(),
            notes: v.get(2).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for DiscountInputString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Total Price={}, Discount={}, Notes={}",
            self.total_price,
            self.discount,
            self.notes
        )
    }
}

impl PartialEq for DiscountInputString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.total_price, &other.total_price)
            && crate::common::dnc_equal(&self.discount, &other.discount)
            && crate::common::dnc_equal(&self.notes, &other.notes)
    }
}
