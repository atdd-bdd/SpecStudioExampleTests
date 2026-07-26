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
}

impl std::fmt::Display for ShoppingCartString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Items={}, Shipping={}, Discount={}, TotalPrice={}, ShippingAddress={:?}, BillingAddress={:?}",
            self.items,
            self.shipping,
            self.discount,
            self.totalprice,
            self.shippingaddress,
            self.billingaddress
        )
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
