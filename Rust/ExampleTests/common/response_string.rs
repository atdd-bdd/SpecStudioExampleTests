#![allow(dead_code, unused_imports, unused_variables)]

use super::result_string::ResultString;
#[derive(Debug, Clone, Default)]
pub struct ResponseString {
    pub result: ResultString,
}

impl ResponseString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            result: Default::default(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 1, "Response");
        Self {
            result: ResultString::from_text(&parts[0]),
        }
    }
}

impl std::fmt::Display for ResponseString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::nested(&self.result.to_string())].join(" "))
    }
}

impl PartialEq for ResponseString {
    fn eq(&self, other: &Self) -> bool {
        self.result == other.result
    }
}
