use super::{Pins, Score, PINS_MAX};

const FRAMES: usize = 10;

/// One frame's rolls as the scoresheet shows them, plus its score.
///
/// roll1..roll3 are the three rolls starting at this frame's first roll -- not
/// only the rolls bowled in this frame. After a strike, roll2 and roll3 are the
/// next frame's rolls, because those are what score this one. The spec's
/// FrameValues table is written that way: frame 4 is a strike and still lists
/// Roll2 and Roll3 as the two rolls that follow it.
#[derive(Debug, Clone)]
pub struct Frame {
    pub number: usize,
    pub roll1: Pins,
    pub roll2: Pins,
    pub roll3: Pins,
    pub score: Score,
    pub total_score: Score,
}

impl Frame {
    pub fn is_strike(&self) -> bool {
        self.roll1.is_strike()
    }

    /// A spare only counts when it is not already a strike.
    pub fn is_spare(&self) -> bool {
        !self.is_strike()
            && self.roll1.is_rolled()
            && self.roll2.is_rolled()
            && self.roll1.count() + self.roll2.count() == PINS_MAX
    }
}

/// How one frame is written on a scoresheet: X for a strike, / for a spare,
/// - for a gutter ball, blank for a roll not yet made.
///
/// mark3 is only ever filled on the tenth frame, the only frame that can have a
/// third roll of its own.
#[derive(Debug, Clone)]
pub struct FrameMarks {
    pub frame: String,
    pub mark1: String,
    pub mark2: String,
    pub mark3: String,
    pub total_score: String,
}

impl FrameMarks {
    /// The mark columns joined, as they appear in the top row of the display.
    pub fn marks(&self) -> String {
        format!("{}{}{}", self.mark1, self.mark2, self.mark3)
    }
}

/// Where the next roll goes, and how many pins are standing for it -- what a
/// keypad needs in order to disable the buttons that cannot be pressed.
#[derive(Debug, Clone, Copy)]
pub struct InputControl {
    pub frame: usize,
    pub roll: usize,
    pub remaining: i32,
}

/// A game of ten-pin bowling: the rolls made so far, the scoresheet they
/// produce, and what the next roll is allowed to be.
///
/// All the scoring lives here rather than in the test glue. The glue's job is to
/// hand rolls in and read values out.
#[derive(Debug, Clone, Default)]
pub struct BowlingGame {
    rolls: Vec<i32>,

    /// True when the game was seeded with the tenth frame's rolls alone, so the
    /// tenth frame can be examined without bowling the nine before it. The
    /// earlier frames then have no rolls, which is why their scores -- and every
    /// running total -- stay TBS.
    tenth_frame_only: bool,
}

impl BowlingGame {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn rolls(&self) -> Vec<i32> {
        self.rolls.clone()
    }

    /// Replaces the rolls outright. Setup, not play -- no validation.
    pub fn set_rolls(&mut self, pin_counts: &[i32]) {
        self.rolls = pin_counts.to_vec();
        self.tenth_frame_only = false;
    }

    /// Seeds only the tenth frame; frames 1..9 are left unbowled.
    pub fn set_tenth_frame_rolls(&mut self, pin_counts: &[i32]) {
        self.rolls = pin_counts.to_vec();
        self.tenth_frame_only = true;
    }

    /// Bowls one roll. Returns false and changes nothing when the roll is
    /// impossible -- more pins than are standing, or a game already over.
    pub fn add_roll(&mut self, pin_count: i32) -> bool {
        if !(0..=PINS_MAX).contains(&pin_count) {
            return false;
        }
        if self.is_complete() {
            return false;
        }
        if pin_count > self.input_control().remaining {
            return false;
        }
        self.rolls.push(pin_count);
        true
    }

    /// Recomputes the scoresheet. Scoring is derived on demand, so this exists
    /// to give the specification's "When scored" step something real to drive.
    pub fn score(&self) {
        let _ = self.frames();
    }

    // ---- scoresheet --------------------------------------------------------

    pub fn frames(&self) -> Vec<Frame> {
        let mut result = Vec::new();
        let starts = self.frame_starts();
        let mut running = 0;
        let mut running_known = true;

        for f in 1..=FRAMES {
            let start = starts[f];
            let roll1 = self.pins_at(start);
            let roll2 = self.pins_at(start + 1);
            let roll3 = self.pins_at(start + 2);

            let strike = roll1.is_strike();
            let spare = !strike
                && roll1.is_rolled()
                && roll2.is_rolled()
                && roll1.count() + roll2.count() == PINS_MAX;

            // A strike or a spare is only worth what the following rolls make
            // it, so it needs three rolls before it can be scored at all.
            let needed = if strike || spare { 3 } else { 2 };

            let mut score = Score::tbs();
            let mut total = Score::tbs();
            if self.all_rolled(start, needed) {
                let points = roll1.count()
                    + roll2.count()
                    + if needed == 3 { roll3.count() } else { 0 };
                score = Score::from_points(points);
                if running_known {
                    running += points;
                    total = Score::from_points(running);
                }
            } else {
                // Once one frame cannot be scored, no later total can be either.
                running_known = false;
            }

            result.push(Frame { number: f, roll1, roll2, roll3, score, total_score: total });
        }
        result
    }

    pub fn marks(&self) -> Vec<FrameMarks> {
        let mut result = Vec::new();

        for frame in self.frames() {
            let mut mark1 = String::new();
            let mut mark2 = String::new();
            let mut mark3 = String::new();

            if frame.roll1.is_rolled() {
                mark1 = if frame.roll1.is_strike() { "X".to_string() } else { digit(&frame.roll1) };
            }

            if frame.number < FRAMES {
                // Frames 1..9 show only their own two rolls; after a strike
                // there is no second mark, even though roll2 holds the next
                // frame's roll.
                if !frame.roll1.is_strike() && frame.roll1.is_rolled() && frame.roll2.is_rolled() {
                    mark2 = if frame.roll1.count() + frame.roll2.count() == PINS_MAX {
                        "/".to_string()
                    } else {
                        digit(&frame.roll2)
                    };
                }
            } else {
                if frame.roll2.is_rolled() {
                    mark2 = if frame.roll1.is_strike() {
                        if frame.roll2.is_strike() { "X".to_string() } else { digit(&frame.roll2) }
                    } else if frame.roll1.count() + frame.roll2.count() == PINS_MAX {
                        "/".to_string()
                    } else {
                        digit(&frame.roll2)
                    };
                }
                if frame.roll3.is_rolled() {
                    let spare_on_bonus = frame.roll1.is_strike()
                        && !frame.roll2.is_strike()
                        && frame.roll2.count() + frame.roll3.count() == PINS_MAX;
                    mark3 = if spare_on_bonus {
                        "/".to_string()
                    } else if frame.roll3.is_strike() {
                        "X".to_string()
                    } else {
                        digit(&frame.roll3)
                    };
                }
            }

            let total = if frame.total_score.is_computable() {
                frame.total_score.to_string()
            } else {
                String::new()
            };
            result.push(FrameMarks {
                frame: frame.number.to_string(),
                mark1,
                mark2,
                mark3,
                total_score: total,
            });
        }
        result
    }

    /// The scoresheet as two rows: marks above, running totals below.
    ///
    /// Each frame's column is as wide as the wider of its two cells, so a frame
    /// whose total reaches three digits widens both rows together and the
    /// columns stay aligned under each other.
    ///
    /// Two rows, no trailing newline: that is what the docstring in the
    /// specification holds, and it is compared as text.
    pub fn display(&self) -> String {
        let mut top = String::new();
        let mut bottom = String::new();

        for frame in self.marks() {
            let width = frame.marks().len().max(frame.total_score.len());
            top.push_str(&format!("| {:width$} ", frame.marks(), width = width));
            bottom.push_str(&format!("| {:width$} ", frame.total_score, width = width));
        }
        format!("{}|\n{}|", top, bottom)
    }

    // ---- state -------------------------------------------------------------

    /// True once the tenth frame has had every roll it is entitled to.
    pub fn is_complete(&self) -> bool {
        let start = self.frame_starts()[FRAMES];
        let roll1 = self.pins_at(start);
        let roll2 = self.pins_at(start + 1);
        if !roll1.is_rolled() || !roll2.is_rolled() {
            return false;
        }

        let strike = roll1.is_strike();
        let spare = !strike && roll1.count() + roll2.count() == PINS_MAX;
        if strike || spare {
            self.pins_at(start + 2).is_rolled()
        } else {
            true
        }
    }

    /// Which frame and roll the next ball belongs to, and how many pins stand.
    pub fn input_control(&self) -> InputControl {
        let starts = self.frame_starts();

        for f in 1..FRAMES {
            let start = starts[f];
            let roll1 = self.pins_at(start);
            if !roll1.is_rolled() {
                return InputControl { frame: f, roll: 1, remaining: PINS_MAX };
            }
            if roll1.is_strike() {
                continue; // one roll ends the frame
            }
            if !self.pins_at(start + 1).is_rolled() {
                return InputControl { frame: f, roll: 2, remaining: PINS_MAX - roll1.count() };
            }
        }

        let start = starts[FRAMES];
        let roll1 = self.pins_at(start);
        let roll2 = self.pins_at(start + 1);
        if !roll1.is_rolled() {
            return InputControl { frame: FRAMES, roll: 1, remaining: PINS_MAX };
        }
        if !roll2.is_rolled() {
            let remaining = if roll1.is_strike() { PINS_MAX } else { PINS_MAX - roll1.count() };
            return InputControl { frame: FRAMES, roll: 2, remaining };
        }

        // Third roll of the tenth. After two strikes the rack is full again;
        // after a strike then a non-strike, only what that ball left standing;
        // after a spare, a fresh rack.
        let remaining = if roll1.is_strike() && !roll2.is_strike() {
            PINS_MAX - roll2.count()
        } else {
            PINS_MAX
        };
        InputControl { frame: FRAMES, roll: 3, remaining }
    }

    // ---- helpers -----------------------------------------------------------

    /// Index of each frame's first roll. A strike ends a frame in one roll, so
    /// the next frame starts one later rather than two.
    fn frame_starts(&self) -> Vec<usize> {
        let mut starts = vec![0usize; FRAMES + 1];

        if self.tenth_frame_only {
            // Frames 1..9 are unbowled: point them past every roll so each one
            // reads back as TBR.
            for f in starts.iter_mut().take(FRAMES).skip(1) {
                *f = self.rolls.len() + FRAMES * 2;
            }
            starts[FRAMES] = 0;
            return starts;
        }

        let mut index = 0usize;
        for f in 1..FRAMES {
            starts[f] = index;
            index += if index < self.rolls.len() && self.rolls[index] == PINS_MAX { 1 } else { 2 };
        }
        starts[FRAMES] = index;
        starts
    }

    fn pins_at(&self, index: usize) -> Pins {
        match self.rolls.get(index) {
            None => Pins::tbr(),
            Some(count) => Pins::from_count(*count),
        }
    }

    fn all_rolled(&self, start: usize, count: usize) -> bool {
        (0..count).all(|i| self.pins_at(start + i).is_rolled())
    }
}

/// A gutter ball is written as a dash, not a zero.
fn digit(pins: &Pins) -> String {
    if pins.count() == 0 {
        "-".to_string()
    } else {
        pins.count().to_string()
    }
}
