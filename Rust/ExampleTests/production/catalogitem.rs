#[derive(Debug, Clone)]
pub struct CatalogItem {
    pub name: SimpleText,
    pub price: Dollar,
}

impl CatalogItem {
    pub fn new(name: SimpleText, price: Dollar) -> Self {
        Self { name,  price }
    }
}
