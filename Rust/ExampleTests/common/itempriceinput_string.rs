#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ItemPriceInputString {
    pub totalitems: String,
}

impl ItemPriceInputString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            totalitems: v.get(0).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for ItemPriceInputString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "TotalItems={}",
            self.totalitems
        )
    }
}

impl PartialEq for ItemPriceInputString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.totalitems, &other.totalitems)
    }
}
