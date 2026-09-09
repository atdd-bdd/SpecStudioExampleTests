#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ValidValuesString {
    pub value: String,
    pub isvalid: String,
    pub notes: String,
}

impl ValidValuesString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            value: v.get(0).copied().unwrap_or("").to_string(),
            isvalid: v.get(1).copied().unwrap_or("").to_string(),
            notes: v.get(2).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 3, "ValidValues");
        Self {
            value: parts[0].clone(),
            isvalid: parts[1].clone(),
            notes: parts[2].clone(),
        }
    }
}

impl std::fmt::Display for ValidValuesString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.value), crate::common::tokens::token(&self.isvalid), crate::common::tokens::token(&self.notes)].join(" "))
    }
}

impl PartialEq for ValidValuesString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.value, &other.value)
            && crate::common::dnc_equal(&self.isvalid, &other.isvalid)
            && crate::common::dnc_equal(&self.notes, &other.notes)
    }
}
