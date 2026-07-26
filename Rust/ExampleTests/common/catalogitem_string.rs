#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct CatalogItemString {
    pub name: String,
    pub price: String,
}

impl CatalogItemString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            name: v.get(0).copied().unwrap_or("").to_string(),
            price: v.get(1).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for CatalogItemString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Name={}, Price={}",
            self.name,
            self.price
        )
    }
}

impl PartialEq for CatalogItemString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.name, &other.name)
            && crate::common::dnc_equal(&self.price, &other.price)
    }
}
