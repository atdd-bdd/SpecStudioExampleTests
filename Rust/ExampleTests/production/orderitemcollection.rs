use super::*;

pub const ORDERITEMCOLLECTION_MINIMUM: usize = 0;
pub const ORDERITEMCOLLECTION_MAXIMUM: usize = 100;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct OrderItemCollection {
    items: Vec<OrderItem>,
}

impl OrderItemCollection {
    pub fn new() -> Self { Self::default() }

    pub fn add(&mut self, item: OrderItem) {
        self.items.push(item);
    }

    pub fn delete(&mut self, item: &OrderItem) -> bool
    where
        OrderItem: PartialEq,
    {
        if let Some(pos) = self.items.iter().position(|x| x == item) {
            self.items.remove(pos);
            true
        } else { false }
    }

    pub fn read(&self) -> &[OrderItem] {
        &self.items
    }

    pub fn update(&mut self, old_item: &OrderItem, new_item: OrderItem) -> bool
    where
        OrderItem: PartialEq,
    {
        if let Some(pos) = self.items.iter().position(|x| x == old_item) {
            self.items[pos] = new_item;
            true
        } else { false }
    }

    pub fn size(&self) -> usize { self.items.len() }
}
