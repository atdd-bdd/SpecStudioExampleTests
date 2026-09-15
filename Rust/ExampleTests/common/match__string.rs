#![allow(dead_code, unused_imports, unused_variables)]

use super::addresscomponents_string::AddressComponentsString;
#[derive(Debug, Clone, Default)]
pub struct MatchString {
    pub matchedaddress: String,
    pub addresscomponents: AddressComponentsString,
}

impl MatchString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            matchedaddress: v.get(0).copied().unwrap_or("").to_string(),
            addresscomponents: Default::default(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 2, "Match");
        Self {
            matchedaddress: parts[0].clone(),
            addresscomponents: AddressComponentsString::from_text(&parts[1]),
        }
    }
}

impl std::fmt::Display for MatchString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.matchedaddress), crate::common::tokens::nested(&self.addresscomponents.to_string())].join(" "))
    }
}

impl PartialEq for MatchString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.matchedaddress, &other.matchedaddress)
            && self.addresscomponents == other.addresscomponents
    }
}
