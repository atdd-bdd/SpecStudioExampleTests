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

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 5, "CartInput");
        Self {
            totalitems: parts[0].clone(),
            shipping: parts[1].clone(),
            discount: parts[2].clone(),
            total_price: parts[3].clone(),
            notes: parts[4].clone(),
        }
    }
}

impl std::fmt::Display for CartInputString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.totalitems), crate::common::tokens::token(&self.shipping), crate::common::tokens::token(&self.discount), crate::common::tokens::token(&self.total_price), crate::common::tokens::token(&self.notes)].join(" "))
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
