/// Alphabetic, numeric, space, hyphen, period, comma — nothing else.
#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct SimpleText {
    pub value: String,
}

impl SimpleText {
    pub fn parse(value: &str) -> Result<Self, String> {
        let allowed = |c: char| c.is_ascii_alphanumeric()
            || matches!(c, ' ' | ',' | '.' | '-');
        if !value.chars().all(allowed) {
            return Err(format!("Invalid SimpleText: {value}"));
        }
        Ok(SimpleText { value: value.to_string() })
    }

    pub fn new(value: &str) -> Self { SimpleText { value: value.to_string() } }
}

impl std::fmt::Display for SimpleText {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
