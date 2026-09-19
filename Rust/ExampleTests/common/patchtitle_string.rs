#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct PatchTitleString {
    pub title: String,
}

impl PatchTitleString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            title: v.get(0).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 1, "PatchTitle");
        Self {
            title: parts[0].clone(),
        }
    }
}

impl std::fmt::Display for PatchTitleString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.title)].join(" "))
    }
}

impl PartialEq for PatchTitleString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.title, &other.title)
    }
}
