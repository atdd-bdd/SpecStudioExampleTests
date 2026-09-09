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

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 3, "Adder");
        Self {
            number1: parts[0].clone(),
            number2: parts[1].clone(),
            result: parts[2].clone(),
        }
    }
}

impl std::fmt::Display for AdderString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.number1), crate::common::tokens::token(&self.number2), crate::common::tokens::token(&self.result)].join(" "))
    }
}

impl PartialEq for AdderString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.number1, &other.number1)
            && crate::common::dnc_equal(&self.number2, &other.number2)
            && crate::common::dnc_equal(&self.result, &other.result)
    }
}
