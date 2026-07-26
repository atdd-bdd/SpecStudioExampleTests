#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct IDValueString {
    pub id: String,
    pub value: String,
}

impl IDValueString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            id: v.get(0).copied().unwrap_or("").to_string(),
            value: v.get(1).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for IDValueString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "ID={}, Value={}",
            self.id,
            self.value
        )
    }
}

impl PartialEq for IDValueString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.id, &other.id)
            && crate::common::dnc_equal(&self.value, &other.value)
    }
}
