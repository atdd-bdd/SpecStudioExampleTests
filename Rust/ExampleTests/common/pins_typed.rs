#![allow(dead_code, unused_imports, unused_variables)]

use super::pins_string::PinsString;

/// Pins converted: the text, which the glue converts to
/// the production value.
///
/// Rust's constructor for a DataType returns Result<Self, String> when the
/// type can refuse a value and plain Self when it cannot, and the generator
/// cannot know which, so there is no call it could write here. That rule is
/// the project's own in any case, and a specification may state a value the
/// rule refuses, so reading it belongs in the glue rather than on a line of
/// a test body.
#[derive(Debug, Clone, Default)]
pub struct PinsTyped {
    pub text: String,
}

impl PinsTyped {
    pub fn from_str_struct(s: &PinsString) -> Self {
        Self { text: s.value().to_string() }
    }

    pub fn to_str_struct(&self) -> PinsString {
        PinsString(self.text.clone())
    }

    /// False for an empty cell and for the Do-Not-Care marker, neither of
    /// which states a value.
    pub fn has_value(&self) -> bool {
        !self.text.is_empty() && self.text != crate::common::DNC_STRING
    }

    /// The text to convert.
    pub fn get(&self) -> &str {
        &self.text
    }

    pub fn to_string_list(list: &[PinsTyped]) -> Vec<PinsString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[PinsString]) -> Vec<PinsTyped> {
        list.iter().map(PinsTyped::from_str_struct).collect()
    }
}

impl From<String> for PinsTyped {
    fn from(text: String) -> Self {
        Self { text }
    }
}

impl std::fmt::Display for PinsTyped {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.text)
    }
}

impl PartialEq for PinsTyped {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.text, &other.text)
    }
}
