use super::*;

pub const ORDER_ITEM_COLLECTION_MINIMUM: usize = 0;
pub const ORDER_ITEM_COLLECTION_MAXIMUM: usize = 100;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct OrderItemCollection {
    items: Vec<OrderItem>,
}

impl OrderItemCollection {
    pub fn new() -> Self { Self::default() }

    pub fn add(&mut self, item: OrderItem) { self.items.push(item); }
    pub fn read(&self) -> &[OrderItem] { &self.items }
    pub fn size(&self) -> usize { self.items.len() }

    pub fn compute_total(&self) -> Dollar {
        self.items.iter().fold(Dollar::default(), |acc, i| acc.plus(&i.item_total))
    }
}
