#![allow(dead_code, unused_imports, unused_variables)]

use super::pins_string::PinsString;
#[derive(Debug, Clone, Default)]
pub struct InputControlValuesString {
    pub frame: String,
    pub roll: PinsString,
    pub remaining: PinsString,
}

impl InputControlValuesString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            frame: v.get(0).copied().unwrap_or("").to_string(),
            roll: PinsString::from(v.get(1).copied().unwrap_or("")),
            remaining: PinsString::from(v.get(2).copied().unwrap_or("")),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 3, "InputControlValues");
        Self {
            frame: parts[0].clone(),
            roll: PinsString::from(parts[1].clone()),
            remaining: PinsString::from(parts[2].clone()),
        }
    }
}

impl std::fmt::Display for InputControlValuesString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.frame), crate::common::tokens::token(&self.roll), crate::common::tokens::token(&self.remaining)].join(" "))
    }
}

impl PartialEq for InputControlValuesString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.frame, &other.frame)
            && crate::common::dnc_equal(&self.roll, &other.roll)
            && crate::common::dnc_equal(&self.remaining, &other.remaining)
    }
}
