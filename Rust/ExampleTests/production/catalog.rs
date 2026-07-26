use super::*;

pub const CATALOG_MINIMUM: usize = 0;
pub const CATALOG_MAXIMUM: usize = 10000000;

/// The items on offer, each with the price an order line is charged.
#[derive(Debug, Clone, Default, PartialEq)]
pub struct Catalog {
    items: Vec<CatalogItem>,
}

impl Catalog {
    pub fn new() -> Self { Self::default() }

    pub fn add(&mut self, item: CatalogItem) { self.items.push(item); }
    pub fn read(&self) -> &[CatalogItem] { &self.items }
    pub fn size(&self) -> usize { self.items.len() }

    pub fn price_for(&self, name: &SimpleText) -> Option<Dollar> {
        self.items.iter().find(|i| &i.name == name).map(|i| i.price)
    }
}
