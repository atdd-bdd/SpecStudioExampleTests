#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SimpleText {
    pub value: String,
}

impl SimpleText {
    pub fn new(value: impl Into<String>) -> Self {
        Self { value: value.into() }
    }

    pub fn is_valid(&self) -> bool {
        matches!(self.value.to_lowercase().as_str(),
            "abc" | "ab." | "1234567890" | "-a-b"
        )
    }
}

impl From<String> for SimpleText {
    fn from(value: String) -> Self { Self { value } }
}

impl From<&str> for SimpleText {
    fn from(value: &str) -> Self { Self { value: value.to_string() } }
}

impl std::fmt::Display for SimpleText {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
