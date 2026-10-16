#![allow(dead_code, unused_imports, unused_variables)]

use super::pins_string::PinsString;
use super::score_string::ScoreString;
#[derive(Debug, Clone, Default)]
pub struct FrameValuesString {
    pub frame: String,
    pub roll1: PinsString,
    pub roll2: PinsString,
    pub roll3: PinsString,
    pub score: ScoreString,
    pub totalscore: ScoreString,
}

impl FrameValuesString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            frame: v.get(0).copied().unwrap_or("").to_string(),
            roll1: PinsString::from(v.get(1).copied().unwrap_or("")),
            roll2: PinsString::from(v.get(2).copied().unwrap_or("")),
            roll3: PinsString::from(v.get(3).copied().unwrap_or("")),
            score: ScoreString::from(v.get(4).copied().unwrap_or("")),
            totalscore: ScoreString::from(v.get(5).copied().unwrap_or("")),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 6, "FrameValues");
        Self {
            frame: parts[0].clone(),
            roll1: PinsString::from(parts[1].clone()),
            roll2: PinsString::from(parts[2].clone()),
            roll3: PinsString::from(parts[3].clone()),
            score: ScoreString::from(parts[4].clone()),
            totalscore: ScoreString::from(parts[5].clone()),
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
