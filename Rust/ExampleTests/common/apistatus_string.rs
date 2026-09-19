#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ApiStatusString {
    pub code: String,
}

impl ApiStatusString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            code: v.get(0).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 1, "ApiStatus");
        Self {
            code: parts[0].clone(),
        }
    }
}

impl std::fmt::Display for ApiStatusString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.code)].join(" "))
    }
}

impl PartialEq for ApiStatusString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.code, &other.code)
    }
}
