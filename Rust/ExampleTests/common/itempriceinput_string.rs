#![allow(dead_code, unused_imports, unused_variables)]

use super::dollar_string::DollarString;
#[derive(Debug, Clone, Default)]
pub struct ItemPriceInputString {
    pub totalitems: DollarString,
}

impl ItemPriceInputString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            totalitems: DollarString::from(v.get(0).copied().unwrap_or("")),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 1, "ItemPriceInput");
        Self {
            totalitems: DollarString::from(parts[0].clone()),
        }
    }
}

impl std::fmt::Display for ItemPriceInputString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.totalitems)].join(" "))
    }
}

impl PartialEq for ItemPriceInputString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.totalitems, &other.totalitems)
    }
}
