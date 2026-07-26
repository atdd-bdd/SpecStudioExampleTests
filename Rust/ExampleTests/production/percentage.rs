/// A percentage from 0 to 100 inclusive.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub struct Percentage {
    value: i32,
}

impl Percentage {
    pub fn parse(value: &str) -> Result<Self, String> {
        let text = value.replace('%', "");
        let text = text.trim();
        let n: i32 = text.parse().map_err(|_| format!("Not a number: {value}"))?;
        if !(0..=100).contains(&n) {
            return Err(format!("Percentage must be between 0 and 100: {value}"));
        }
        Ok(Percentage { value: n })
    }

    pub fn new(value: i32) -> Self { Percentage { value } }
    pub fn value(&self) -> i32 { self.value }
}

impl std::fmt::Display for Percentage {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
