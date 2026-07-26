use super::*;

pub const CATALOG_MINIMUM: usize = 0;
pub const CATALOG_MAXIMUM: usize = 10000000;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct Catalog {
    items: Vec<CatalogItem>,
}

impl Catalog {
    pub fn new() -> Self { Self::default() }

    pub fn add(&mut self, item: CatalogItem) {
        self.items.push(item);
    }

    pub fn delete(&mut self, item: &CatalogItem) -> bool
    where
        CatalogItem: PartialEq,
    {
        if let Some(pos) = self.items.iter().position(|x| x == item) {
            self.items.remove(pos);
            true
        } else { false }
    }

    pub fn read(&self) -> &[CatalogItem] {
        &self.items
    }

    pub fn update(&mut self, old_item: &CatalogItem, new_item: CatalogItem) -> bool
    where
        CatalogItem: PartialEq,
    {
        if let Some(pos) = self.items.iter().position(|x| x == old_item) {
            self.items[pos] = new_item;
            true
        } else { false }
    }

    pub fn size(&self) -> usize { self.items.len() }
}
