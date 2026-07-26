use super::*;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct OrderItem {
    pub name: SimpleText,
    pub quantity: i32,
    pub price: Dollar,
    pub item_total: Dollar,
}

impl OrderItem {
    pub fn new(name: SimpleText, quantity: i32, price: Dollar, item_total: Dollar) -> Self {
        Self { name, quantity, price, item_total }
    }

    pub fn create(name: SimpleText, quantity: i32, price: Dollar) -> Self {
        Self { name, quantity, price, item_total: price.times(quantity) }
    }

    /// Looks the price up rather than being told it.
    pub fn from_catalog(catalog: &Catalog, name: SimpleText, quantity: i32) -> Option<Self> {
        catalog.price_for(&name).map(|p| Self::create(name, quantity, p))
    }
}
