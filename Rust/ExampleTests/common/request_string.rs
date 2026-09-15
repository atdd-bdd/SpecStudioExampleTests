#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct RequestString {
    pub method: String,
    pub page: String,
    pub address: String,
    pub benchmark: String,
    pub format: String,
}

impl RequestString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            method: v.get(0).copied().unwrap_or("").to_string(),
            page: v.get(1).copied().unwrap_or("").to_string(),
            address: v.get(2).copied().unwrap_or("").to_string(),
            benchmark: v.get(3).copied().unwrap_or("").to_string(),
            format: v.get(4).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 5, "Request");
        Self {
            method: parts[0].clone(),
            page: parts[1].clone(),
            address: parts[2].clone(),
            benchmark: parts[3].clone(),
            format: parts[4].clone(),
        }
    }
}

impl std::fmt::Display for RequestString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.method), crate::common::tokens::token(&self.page), crate::common::tokens::token(&self.address), crate::common::tokens::token(&self.benchmark), crate::common::tokens::token(&self.format)].join(" "))
    }
}

impl PartialEq for RequestString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.method, &other.method)
            && crate::common::dnc_equal(&self.page, &other.page)
            && crate::common::dnc_equal(&self.address, &other.address)
            && crate::common::dnc_equal(&self.benchmark, &other.benchmark)
            && crate::common::dnc_equal(&self.format, &other.format)
    }
}
