#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ApiRequestString {
    pub method: String,
    pub page: String,
    pub parameter: String,
    pub body: String,
}

impl ApiRequestString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            method: v.get(0).copied().unwrap_or("").to_string(),
            page: v.get(1).copied().unwrap_or("").to_string(),
            parameter: v.get(2).copied().unwrap_or("").to_string(),
            body: v.get(3).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 4, "ApiRequest");
        Self {
            method: parts[0].clone(),
            page: parts[1].clone(),
            parameter: parts[2].clone(),
            body: parts[3].clone(),
        }
    }
}

impl std::fmt::Display for ApiRequestString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.method), crate::common::tokens::token(&self.page), crate::common::tokens::token(&self.parameter), crate::common::tokens::token(&self.body)].join(" "))
    }
}

impl PartialEq for ApiRequestString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.method, &other.method)
            && crate::common::dnc_equal(&self.page, &other.page)
            && crate::common::dnc_equal(&self.parameter, &other.parameter)
            && crate::common::dnc_equal(&self.body, &other.body)
    }
}
