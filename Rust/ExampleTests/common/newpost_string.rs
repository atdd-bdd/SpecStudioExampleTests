#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct NewPostString {
    pub title: String,
    pub body: String,
    pub userid: String,
}

impl NewPostString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            title: v.get(0).copied().unwrap_or("").to_string(),
            body: v.get(1).copied().unwrap_or("").to_string(),
            userid: v.get(2).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 3, "NewPost");
        Self {
            title: parts[0].clone(),
            body: parts[1].clone(),
            userid: parts[2].clone(),
        }
    }
}

impl std::fmt::Display for NewPostString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.title), crate::common::tokens::token(&self.body), crate::common::tokens::token(&self.userid)].join(" "))
    }
}

impl PartialEq for NewPostString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.title, &other.title)
            && crate::common::dnc_equal(&self.body, &other.body)
            && crate::common::dnc_equal(&self.userid, &other.userid)
    }
}
