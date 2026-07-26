use super::*;

#[derive(Debug, Clone, PartialEq)]
pub struct Address {
    pub street: SimpleText,
    pub city: SimpleText,
    pub state: SimpleText,
    pub zip: SimpleText,
}

impl Address {
    pub fn new(street: SimpleText, city: SimpleText, state: SimpleText, zip: SimpleText) -> Self {
        Self { street,  city,  state,  zip }
    }
}
