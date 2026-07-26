#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Percentage {
    pub value: String,
}

impl Percentage {
    pub fn new(value: impl Into<String>) -> Self {
        Self { value: value.into() }
    }

    pub fn is_valid(&self) -> bool {
        matches!(self.value.to_lowercase().as_str(),
            "0" | "99" | "100"
        )
    }
}

impl From<String> for Percentage {
    fn from(value: String) -> Self { Self { value } }
}

impl From<&str> for Percentage {
    fn from(value: &str) -> Self { Self { value: value.to_string() } }
}

impl std::fmt::Display for Percentage {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
