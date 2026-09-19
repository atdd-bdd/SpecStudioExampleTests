#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct FrameValuesString {
    pub frame: String,
    pub roll1: String,
    pub roll2: String,
    pub roll3: String,
    pub score: String,
    pub totalscore: String,
}

impl FrameValuesString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            frame: v.get(0).copied().unwrap_or("").to_string(),
            roll1: v.get(1).copied().unwrap_or("").to_string(),
            roll2: v.get(2).copied().unwrap_or("").to_string(),
            roll3: v.get(3).copied().unwrap_or("").to_string(),
            score: v.get(4).copied().unwrap_or("").to_string(),
            totalscore: v.get(5).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 6, "FrameValues");
        Self {
            frame: parts[0].clone(),
            roll1: parts[1].clone(),
            roll2: parts[2].clone(),
            roll3: parts[3].clone(),
            score: parts[4].clone(),
            totalscore: parts[5].clone(),
        }
    }
}

impl std::fmt::Display for FrameValuesString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.frame), crate::common::tokens::token(&self.roll1), crate::common::tokens::token(&self.roll2), crate::common::tokens::token(&self.roll3), crate::common::tokens::token(&self.score), crate::common::tokens::token(&self.totalscore)].join(" "))
    }
}

impl PartialEq for FrameValuesString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.frame, &other.frame)
            && crate::common::dnc_equal(&self.roll1, &other.roll1)
            && crate::common::dnc_equal(&self.roll2, &other.roll2)
            && crate::common::dnc_equal(&self.roll3, &other.roll3)
            && crate::common::dnc_equal(&self.score, &other.score)
            && crate::common::dnc_equal(&self.totalscore, &other.totalscore)
    }
}
