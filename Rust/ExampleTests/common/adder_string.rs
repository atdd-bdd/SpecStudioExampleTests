#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct AdderString {
    pub number1: String,
    pub number2: String,
    pub result: String,
}

impl AdderString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            number1: v.get(0).copied().unwrap_or("").to_string(),
            number2: v.get(1).copied().unwrap_or("").to_string(),
            result: v.get(2).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for AdderString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "number1={}, number2={}, result={}",
            self.number1,
            self.number2,
            self.result
        )
    }
}

impl PartialEq for AdderString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.number1, &other.number1)
            && crate::common::dnc_equal(&self.number2, &other.number2)
            && crate::common::dnc_equal(&self.result, &other.result)
    }
}
