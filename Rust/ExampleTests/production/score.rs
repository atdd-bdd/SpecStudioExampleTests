/// Marker for a score that cannot be computed yet: the integer the spec defines TBS as.
pub const SCORE_TBS: i32 = -1;

pub const SCORE_MIN: i32 = 0;
pub const SCORE_MAX: i32 = 300;

/// A frame score or running total, or -1 (TBS) while the rolls it depends on have not
/// all been made.
///
/// The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect game
/// -- and rejects 301; -1 is valid only because the spec defines TBS as -1:
/// a frame ending in a strike or a spare cannot be scored until its bonus
/// rolls exist, and "not yet computable" is a normal state rather than an error.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Score {
    pub value: i32,
}

impl Score {
    /// The value a frame not yet scorable carries.
    pub fn tbs() -> Self {
        Self { value: SCORE_TBS }
    }

    /// From the text form a table cell holds.
    pub fn new(text: impl Into<String>) -> Result<Self, String> {
        let text = text.into().trim().to_string();
        let points: i32 = text
            .parse()
            .map_err(|_| format!("not a score: {}", text))?;
        if points != SCORE_TBS && !(SCORE_MIN..=SCORE_MAX).contains(&points) {
            return Err(format!(
                "score must be between {} and {}, got {}",
                SCORE_MIN, SCORE_MAX, points
            ));
        }
        Ok(Self { value: points })
    }

    /// The score of a total already known to be in range.
    pub fn from_points(points: i32) -> Self {
        Self { value: points }
    }

    pub fn is_computable(&self) -> bool {
        self.value != SCORE_TBS
    }

    /// Points, or -1 when not yet computable.
    pub fn points(&self) -> i32 {
        self.value
    }
}

/// The text form: what a table cell holds.
impl std::fmt::Display for Score {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.value)
    }
}
