use super::*;

#[derive(Debug, Clone, PartialEq)]
pub struct OrderItem {
    pub name: SimpleText,
    pub quantity: i32,
    pub price: Dollar,
    pub itemtotal: Dollar,
}

impl OrderItem {
    pub fn new(name: SimpleText, quantity: i32, price: Dollar, itemtotal: Dollar) -> Self {
        Self { name,  quantity,  price,  itemtotal }
    }
}
