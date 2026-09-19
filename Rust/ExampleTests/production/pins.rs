/// Marker for a roll that has not been made: the integer the spec defines TBR as.
pub const PINS_TBR: i32 = -1;

/// A full rack.
pub const PINS_MAX: i32 = 10;

/// The number of pins knocked down by one roll, or -1 (TBR) when the roll has not
/// happened yet.
///
/// The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and -2
/// are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls that
/// are still to come. `new` refuses exactly the invalid ones, so a number out of
/// range fails the same way an unparseable one does.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Pins {
    pub value: i32,
}

impl Pins {
    /// The value a roll not yet made carries.
    pub fn tbr() -> Self {
        Self { value: PINS_TBR }
    }

    /// From the text form a table cell holds.
    pub fn new(text: impl Into<String>) -> Result<Self, String> {
        let text = text.into().trim().to_string();
        let count: i32 = text
            .parse()
            .map_err(|_| format!("not a number of pins: {}", text))?;
        if count != PINS_TBR && !(0..=PINS_MAX).contains(&count) {
            return Err(format!("roll must be between 0 and {}, got {}", PINS_MAX, count));
        }
        Ok(Self { value: count })
    }

    /// The roll of a count already known to be in range.
    pub fn from_count(count: i32) -> Self {
        Self { value: count }
    }

    /// False when this is TBR -- the roll has not been made.
    pub fn is_rolled(&self) -> bool {
        self.value != PINS_TBR
    }

    /// Pin count, or -1 when the roll has not been made.
    pub fn count(&self) -> i32 {
        self.value
    }

    pub fn is_strike(&self) -> bool {
        self.is_rolled() && self.value == PINS_MAX
    }
}

/// The text form: what a table cell holds.
impl std::fmt::Display for Pins {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
