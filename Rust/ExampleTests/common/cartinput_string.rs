#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct CartInputString {
    pub totalitems: String,
    pub shipping: String,
    pub discount: String,
    pub total_price: String,
    pub notes: String,
}

impl CartInputString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            totalitems: v.get(0).copied().unwrap_or("").to_string(),
            shipping: v.get(1).copied().unwrap_or("").to_string(),
            discount: v.get(2).copied().unwrap_or("").to_string(),
            total_price: v.get(3).copied().unwrap_or("").to_string(),
            notes: v.get(4).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for CartInputString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "TotalItems={}, Shipping={}, Discount={}, Total Price={}, Notes={}",
            self.totalitems,
            self.shipping,
            self.discount,
            self.total_price,
            self.notes
        )
    }
}

impl PartialEq for CartInputString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.totalitems, &other.totalitems)
            && crate::common::dnc_equal(&self.shipping, &other.shipping)
            && crate::common::dnc_equal(&self.discount, &other.discount)
            && crate::common::dnc_equal(&self.total_price, &other.total_price)
            && crate::common::dnc_equal(&self.notes, &other.notes)
    }
}
