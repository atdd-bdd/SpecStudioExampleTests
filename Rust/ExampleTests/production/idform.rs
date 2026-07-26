/// Exactly five characters, beginning with Q.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Default)]
pub struct IDForm {
    pub value: String,
}

impl IDForm {
    pub fn parse(value: &str) -> Result<Self, String> {
        if value.chars().count() != 5 || !value.starts_with('Q') {
            return Err("Must be 5 characters starting with Q".to_string());
        }
        Ok(IDForm { value: value.to_string() })
    }
}

impl std::fmt::Display for IDForm {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
