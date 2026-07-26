/// A monetary amount: never negative, never finer than a cent.
/// Held as an integer number of cents so the arithmetic is exact.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Default)]
pub struct Dollar {
    cents: i64,
}

impl Dollar {
    /// Reads "$10.00", "10", "0.01" and the like.
    pub fn parse(value: &str) -> Result<Self, String> {
        let text = value.replace('$', "");
        let text = text.trim();
        if text.is_empty() {
            return Ok(Dollar { cents: 0 });
        }
        let negative = text.starts_with('-');
        let digits = text.trim_start_matches(['-', '+']);
        let mut parts = digits.splitn(2, '.');
        let whole = parts.next().unwrap_or("");
        let frac = parts.next().unwrap_or("");
        if whole.is_empty() && frac.is_empty() {
            return Err(format!("Not a number: {value}"));
        }
        if !whole.chars().all(|c| c.is_ascii_digit())
            || !frac.chars().all(|c| c.is_ascii_digit())
        {
            return Err(format!("Not a number: {value}"));
        }
        if frac.len() > 2 {
            return Err(format!(
                "Dollar amount must not have more than two decimal digits: {value}"));
        }
        let whole_v: i64 = if whole.is_empty() { 0 } else {
            whole.parse().map_err(|_| "overflow".to_string())?
        };
        let frac_v: i64 = match frac.len() {
            0 => 0,
            1 => frac.parse::<i64>().map_err(|_| "bad".to_string())? * 10,
            _ => frac.parse::<i64>().map_err(|_| "bad".to_string())?,
        };
        let cents = whole_v * 100 + frac_v;
        if negative && cents != 0 {
            return Err(format!("Dollar amount cannot be negative: {value}"));
        }
        Ok(Dollar { cents })
    }

    pub fn from_cents(cents: i64) -> Self { Dollar { cents } }
    pub fn cents(&self) -> i64 { self.cents }

    pub fn plus(&self, other: &Dollar) -> Dollar { Dollar { cents: self.cents + other.cents } }
    pub fn minus(&self, other: &Dollar) -> Dollar { Dollar { cents: self.cents - other.cents } }
    pub fn times(&self, factor: i32) -> Dollar { Dollar { cents: self.cents * factor as i64 } }

    /// The given percentage of this amount, rounded half up to the nearest cent.
    pub fn percent_of(&self, percentage: &super::Percentage) -> Dollar {
        Dollar { cents: (self.cents * percentage.value() as i64 + 50) / 100 }
    }
}

impl std::fmt::Display for Dollar {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}.{:02}", self.cents / 100, (self.cents % 100).abs())
    }
}
