use super::*;

#[derive(Debug, Clone, PartialEq)]
pub struct ShoppingCart {
    pub items: OrderItemCollection,
    pub shipping: Dollar,
    pub discount: Dollar,
    pub totalprice: Dollar,
    pub shippingaddress: Address,
    pub billingaddress: Address,
}

impl ShoppingCart {
    pub fn new(items: OrderItemCollection, shipping: Dollar, discount: Dollar, totalprice: Dollar, shippingaddress: Address, billingaddress: Address) -> Self {
        Self { items,  shipping,  discount,  totalprice,  shippingaddress,  billingaddress }
    }
}
