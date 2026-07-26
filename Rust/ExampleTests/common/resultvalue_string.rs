#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ResultValueString {
    pub sum: String,
}

impl ResultValueString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            sum: v.get(0).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for ResultValueString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Sum={}",
            self.sum
        )
    }
}

impl PartialEq for ResultValueString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.sum, &other.sum)
    }
}
