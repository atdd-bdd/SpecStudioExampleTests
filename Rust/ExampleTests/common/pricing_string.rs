#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct PricingString {
    pub totalprice: String,
}

impl PricingString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            totalprice: v.get(0).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for PricingString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "TotalPrice={}",
            self.totalprice
        )
    }
}

impl PartialEq for PricingString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.totalprice, &other.totalprice)
    }
}
