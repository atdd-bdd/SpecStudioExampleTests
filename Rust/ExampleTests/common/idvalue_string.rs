#![allow(dead_code, unused_imports, unused_variables)]

use super::idform_string::IDFormString;
#[derive(Debug, Clone, Default)]
pub struct IDValueString {
    pub id: IDFormString,
    pub value: String,
}

impl IDValueString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            id: IDFormString::from(v.get(0).copied().unwrap_or("")),
            value: v.get(1).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 2, "IDValue");
        Self {
            id: IDFormString::from(parts[0].clone()),
            value: parts[1].clone(),
        }
    }
}

impl std::fmt::Display for IDValueString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.id), crate::common::tokens::token(&self.value)].join(" "))
    }
}

impl PartialEq for IDValueString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.id, &other.id)
            && crate::common::dnc_equal(&self.value, &other.value)
    }
}
