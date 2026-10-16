#![allow(dead_code, unused_imports, unused_variables)]

/// Pins as a table cell holds it: the unconverted text.
///
/// A newtype over String, and it derefs to str, so a cell reads as text
/// wherever text is what is wanted while a generated signature still names
/// the DataType the specification declared.
#[derive(Debug, Clone, Default)]
pub struct PinsString(pub String);

impl PinsString {
    pub fn from_text(text: &str) -> Self {
        Self(text.to_string())
    }

    /// The cell's text.
    pub fn value(&self) -> &str {
        &self.0
    }
}

impl From<&str> for PinsString {
    fn from(text: &str) -> Self {
        Self(text.to_string())
    }
}

impl From<String> for PinsString {
    fn from(text: String) -> Self {
        Self(text)
    }
}

impl std::ops::Deref for PinsString {
    type Target = str;
    fn deref(&self) -> &str {
        &self.0
    }
}

impl std::fmt::Display for PinsString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl PartialEq for PinsString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.0, &other.0)
    }
}
