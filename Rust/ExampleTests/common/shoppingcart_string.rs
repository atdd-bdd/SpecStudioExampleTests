#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ShoppingCartString {
    pub items: String,
    pub shipping: String,
    pub discount: String,
    pub totalprice: String,
    pub shippingaddress: String,
    pub billingaddress: String,
}

impl ShoppingCartString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            items: v.get(0).copied().unwrap_or("").to_string(),
            shipping: v.get(1).copied().unwrap_or("").to_string(),
            discount: v.get(2).copied().unwrap_or("").to_string(),
            totalprice: v.get(3).copied().unwrap_or("").to_string(),
            shippingaddress: v.get(4).copied().unwrap_or("").to_string(),
            billingaddress: v.get(5).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for ShoppingCartString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Items={}, Shipping={}, Discount={}, TotalPrice={}, ShippingAddress={}, BillingAddress={}",
            self.items,
            self.shipping,
            self.discount,
            self.totalprice,
            self.shippingaddress,
            self.billingaddress
        )
    }
}
