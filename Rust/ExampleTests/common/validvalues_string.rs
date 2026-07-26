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
}

impl std::fmt::Display for ValidValuesString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Value={}, IsValid={}, Notes={}",
            self.value,
            self.isvalid,
            self.notes
        )
    }
}

impl PartialEq for ValidValuesString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.value, &other.value)
            && crate::common::dnc_equal(&self.isvalid, &other.isvalid)
            && crate::common::dnc_equal(&self.notes, &other.notes)
    }
}
