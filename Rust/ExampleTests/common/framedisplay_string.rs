#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct FrameDisplayString {
    pub frame: String,
    pub mark1: String,
    pub mark2: String,
    pub mark3: String,
    pub totalscore: String,
}

impl FrameDisplayString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            frame: v.get(0).copied().unwrap_or("").to_string(),
            mark1: v.get(1).copied().unwrap_or("").to_string(),
            mark2: v.get(2).copied().unwrap_or("").to_string(),
            mark3: v.get(3).copied().unwrap_or("").to_string(),
            totalscore: v.get(4).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 5, "FrameDisplay");
        Self {
            frame: parts[0].clone(),
            mark1: parts[1].clone(),
            mark2: parts[2].clone(),
            mark3: parts[3].clone(),
            totalscore: parts[4].clone(),
        }
    }
}

impl std::fmt::Display for FrameDisplayString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.frame), crate::common::tokens::token(&self.mark1), crate::common::tokens::token(&self.mark2), crate::common::tokens::token(&self.mark3), crate::common::tokens::token(&self.totalscore)].join(" "))
    }
}

impl PartialEq for FrameDisplayString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.frame, &other.frame)
            && crate::common::dnc_equal(&self.mark1, &other.mark1)
            && crate::common::dnc_equal(&self.mark2, &other.mark2)
            && crate::common::dnc_equal(&self.mark3, &other.mark3)
            && crate::common::dnc_equal(&self.totalscore, &other.totalscore)
    }
}
