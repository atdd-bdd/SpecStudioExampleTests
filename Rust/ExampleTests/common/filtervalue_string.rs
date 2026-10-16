#![allow(dead_code, unused_imports, unused_variables)]

use super::idform_string::IDFormString;
#[derive(Debug, Clone, Default)]
pub struct FilterValueString {
    pub value: IDFormString,
}

impl FilterValueString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            value: IDFormString::from(v.get(0).copied().unwrap_or("")),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 1, "FilterValue");
        Self {
            value: IDFormString::from(parts[0].clone()),
        }
    }
}

impl std::fmt::Display for FilterValueString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.value)].join(" "))
    }
}

impl PartialEq for FilterValueString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.value, &other.value)
    }
}
