#![allow(dead_code, unused_imports, unused_variables)]

use super::simpletext_string::SimpleTextString;
use super::dollar_string::DollarString;
#[derive(Debug, Clone, Default)]
pub struct CatalogItemString {
    pub name: SimpleTextString,
    pub price: DollarString,
}

impl CatalogItemString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            name: SimpleTextString::from(v.get(0).copied().unwrap_or("")),
            price: DollarString::from(v.get(1).copied().unwrap_or("")),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 2, "CatalogItem");
        Self {
            name: SimpleTextString::from(parts[0].clone()),
            price: DollarString::from(parts[1].clone()),
        }
    }
}

impl std::fmt::Display for CatalogItemString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.name), crate::common::tokens::token(&self.price)].join(" "))
    }
}

impl PartialEq for CatalogItemString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.name, &other.name)
            && crate::common::dnc_equal(&self.price, &other.price)
    }
}
