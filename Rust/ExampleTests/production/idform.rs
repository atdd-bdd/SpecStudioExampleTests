#[derive(Debug, Clone, PartialEq, Eq)]
pub struct IDForm {
    pub value: String,
}

impl IDForm {
    pub fn new(value: impl Into<String>) -> Self {
        Self { value: value.into() }
    }

    pub fn is_valid(&self) -> bool {
        matches!(self.value.to_lowercase().as_str(),
            "q1234"
        )
    }
}

impl From<String> for IDForm {
    fn from(value: String) -> Self { Self { value } }
}

impl From<&str> for IDForm {
    fn from(value: &str) -> Self { Self { value: value.to_string() } }
}

impl std::fmt::Display for IDForm {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
