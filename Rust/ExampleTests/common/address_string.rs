#![allow(dead_code, unused_imports, unused_variables)]

use super::simpletext_string::SimpleTextString;
#[derive(Debug, Clone, Default)]
pub struct AddressString {
    pub street: SimpleTextString,
    pub city: SimpleTextString,
    pub state: SimpleTextString,
    pub zip: SimpleTextString,
}

impl AddressString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            street: SimpleTextString::from(v.get(0).copied().unwrap_or("")),
            city: SimpleTextString::from(v.get(1).copied().unwrap_or("")),
            state: SimpleTextString::from(v.get(2).copied().unwrap_or("")),
            zip: SimpleTextString::from(v.get(3).copied().unwrap_or("")),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 4, "Address");
        Self {
            street: SimpleTextString::from(parts[0].clone()),
            city: SimpleTextString::from(parts[1].clone()),
            state: SimpleTextString::from(parts[2].clone()),
            zip: SimpleTextString::from(parts[3].clone()),
        }
    }
}

impl std::fmt::Display for AddressString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.street), crate::common::tokens::token(&self.city), crate::common::tokens::token(&self.state), crate::common::tokens::token(&self.zip)].join(" "))
    }
}

impl PartialEq for AddressString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.street, &other.street)
            && crate::common::dnc_equal(&self.city, &other.city)
            && crate::common::dnc_equal(&self.state, &other.state)
            && crate::common::dnc_equal(&self.zip, &other.zip)
    }
}
