#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Dollar {
    pub value: String,
}

impl Dollar {
    pub fn new(value: impl Into<String>) -> Self {
        Self { value: value.into() }
    }

    pub fn is_valid(&self) -> bool {
        matches!(self.value.to_lowercase().as_str(),
            "0" | "0.01"
        )
    }
}

impl From<String> for Dollar {
    fn from(value: String) -> Self { Self { value } }
}

impl From<&str> for Dollar {
    fn from(value: &str) -> Self { Self { value: value.to_string() } }
}

impl std::fmt::Display for Dollar {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
