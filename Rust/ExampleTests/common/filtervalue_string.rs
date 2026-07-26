#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct FilterValueString {
    pub value: String,
}

impl FilterValueString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            value: v.get(0).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for FilterValueString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Value={}",
            self.value
        )
    }
}
