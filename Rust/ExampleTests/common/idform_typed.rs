#![allow(dead_code, unused_imports, unused_variables)]

use super::idform_string::IDFormString;

/// IDForm converted: the text, which the glue converts to
/// the production value.
///
/// Rust's constructor for a DataType returns Result<Self, String> when the
/// type can refuse a value and plain Self when it cannot, and the generator
/// cannot know which, so there is no call it could write here. That rule is
/// the project's own in any case, and a specification may state a value the
/// rule refuses, so reading it belongs in the glue rather than on a line of
/// a test body.
#[derive(Debug, Clone, Default)]
pub struct IDFormTyped {
    pub text: String,
}

impl IDFormTyped {
    pub fn from_str_struct(s: &IDFormString) -> Self {
        Self { text: s.value().to_string() }
    }

    pub fn to_str_struct(&self) -> IDFormString {
        IDFormString(self.text.clone())
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

    pub fn to_string_list(list: &[IDFormTyped]) -> Vec<IDFormString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[IDFormString]) -> Vec<IDFormTyped> {
        list.iter().map(IDFormTyped::from_str_struct).collect()
    }
}

impl From<String> for IDFormTyped {
    fn from(text: String) -> Self {
        Self { text }
    }
}

impl std::fmt::Display for IDFormTyped {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.text)
    }
}

impl PartialEq for IDFormTyped {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.text, &other.text)
    }
}
