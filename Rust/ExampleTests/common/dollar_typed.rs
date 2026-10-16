#![allow(dead_code, unused_imports, unused_variables)]

use super::dollar_string::DollarString;

/// Dollar converted: the text, which the glue converts to
/// the production value.
///
/// Rust's constructor for a DataType returns Result<Self, String> when the
/// type can refuse a value and plain Self when it cannot, and the generator
/// cannot know which, so there is no call it could write here. That rule is
/// the project's own in any case, and a specification may state a value the
/// rule refuses, so reading it belongs in the glue rather than on a line of
/// a test body.
#[derive(Debug, Clone, Default)]
pub struct DollarTyped {
    pub text: String,
}

impl DollarTyped {
    pub fn from_str_struct(s: &DollarString) -> Self {
        Self { text: s.value().to_string() }
    }

    pub fn to_str_struct(&self) -> DollarString {
        DollarString(self.text.clone())
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

    pub fn to_string_list(list: &[DollarTyped]) -> Vec<DollarString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[DollarString]) -> Vec<DollarTyped> {
        list.iter().map(DollarTyped::from_str_struct).collect()
    }
}

impl From<String> for DollarTyped {
    fn from(text: String) -> Self {
        Self { text }
    }
}

impl std::fmt::Display for DollarTyped {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.text)
    }
}

impl PartialEq for DollarTyped {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.text, &other.text)
    }
}
