#![allow(dead_code, unused_imports, unused_variables)]

use super::address_string::AddressString;
#[derive(Debug, Clone, Default)]
pub struct ShoppingCartString {
    pub items: String,
    pub shipping: String,
    pub discount: String,
    pub totalprice: String,
    pub shippingaddress: AddressString,
    pub billingaddress: AddressString,
}

impl ShoppingCartString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            items: v.get(0).copied().unwrap_or("").to_string(),
            shipping: v.get(1).copied().unwrap_or("").to_string(),
            discount: v.get(2).copied().unwrap_or("").to_string(),
            totalprice: v.get(3).copied().unwrap_or("").to_string(),
            shippingaddress: Default::default(),
            billingaddress: Default::default(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 6, "ShoppingCart");
        Self {
            items: parts[0].clone(),
            shipping: parts[1].clone(),
            discount: parts[2].clone(),
            totalprice: parts[3].clone(),
            shippingaddress: AddressString::from_text(&parts[4]),
            billingaddress: AddressString::from_text(&parts[5]),
        }
    }
}

impl std::fmt::Display for ShoppingCartString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.items), crate::common::tokens::token(&self.shipping), crate::common::tokens::token(&self.discount), crate::common::tokens::token(&self.totalprice), crate::common::tokens::nested(&self.shippingaddress.to_string()), crate::common::tokens::nested(&self.billingaddress.to_string())].join(" "))
    }
}

impl PartialEq for ShoppingCartString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.items, &other.items)
            && crate::common::dnc_equal(&self.shipping, &other.shipping)
            && crate::common::dnc_equal(&self.discount, &other.discount)
            && crate::common::dnc_equal(&self.totalprice, &other.totalprice)
            && self.shippingaddress == other.shippingaddress
            && self.billingaddress == other.billingaddress
    }
}
