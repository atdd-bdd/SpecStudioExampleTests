#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct ReplacePostString {
    pub id: String,
    pub userid: String,
    pub title: String,
    pub body: String,
}

impl ReplacePostString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            id: v.get(0).copied().unwrap_or("").to_string(),
            userid: v.get(1).copied().unwrap_or("").to_string(),
            title: v.get(2).copied().unwrap_or("").to_string(),
            body: v.get(3).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 4, "ReplacePost");
        Self {
            id: parts[0].clone(),
            userid: parts[1].clone(),
            title: parts[2].clone(),
            body: parts[3].clone(),
        }
    }
}

impl std::fmt::Display for ReplacePostString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.id), crate::common::tokens::token(&self.userid), crate::common::tokens::token(&self.title), crate::common::tokens::token(&self.body)].join(" "))
    }
}

impl PartialEq for ReplacePostString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.id, &other.id)
            && crate::common::dnc_equal(&self.userid, &other.userid)
            && crate::common::dnc_equal(&self.title, &other.title)
            && crate::common::dnc_equal(&self.body, &other.body)
    }
}
