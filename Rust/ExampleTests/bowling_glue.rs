#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;
use crate::production::{BowlingGame, Frame, FrameMarks, Pins, Score};

const DNC_STRING: &str = "?DNC?";

/// Drives BowlingGame from the specification's steps.
///
/// There is no scoring here on purpose: every rule about strikes, spares, marks
/// and totals lives in the production classes, and this file only hands rolls in
/// and compares what comes back.
pub struct BowlingGlue {
    game: BowlingGame,
}

impl BowlingGlue {
    pub fn new() -> Self {
        Self { game: BowlingGame::new() }
    }

    // ---- given -------------------------------------------------------------

    pub fn given_rolls_are(&mut self, values: &[Vec<String>]) {
        let counts = Self::pin_counts(values);
        self.game.set_rolls(&counts);
    }

    pub fn given_rolls_for_tenth_frame_are(&mut self, values: &[Vec<String>]) {
        let counts = Self::pin_counts(values);
        self.game.set_tenth_frame_rolls(&counts);
    }

    /// The frame values from the previous step are still on the same game.
    pub fn given_frame_values_are_as_previous(&mut self) {
        assert!(!self.game.frames().is_empty(), "no game to carry forward");
    }

    // ---- when --------------------------------------------------------------

    pub fn when_roll_is(&mut self, values: &[Vec<String>]) {
        for pin_count in Self::pin_counts(values) {
            self.game.add_roll(pin_count);
        }
    }

    pub fn when_scored(&mut self) {
        self.game.score();
    }

    // ---- then --------------------------------------------------------------

    pub fn then_rolls_become(&mut self, values: &[Vec<String>]) {
        let expected = Self::pin_counts(values);
        let actual = self.game.rolls();

        assert_eq!(expected.len(), actual.len(), "number of rolls {:?}", actual);
        for (i, want) in expected.iter().enumerate() {
            assert_eq!(*want, actual[i], "roll {}", i + 1);
        }
    }

    pub fn then_display_is(&mut self, value: &str) {
        assert_eq!(self.game.display(), value, "display");
    }

    pub fn then_frame_values_are(&mut self, values: &[FrameValuesString]) {
        for expected in values {
            self.assert_frame_equals(expected);
        }
    }

    /// The step reads "Then Then tenth frame values are" in the specification,
    /// and the generated method name follows it. Renaming the method would only
    /// make it disagree with the generated test.
    pub fn then_then_tenth_frame_values_are(&mut self, values: &[FrameValuesString]) {
        for expected in values {
            self.assert_frame_equals(expected);
        }
    }

    pub fn then_display_values_are(&mut self, values: &[FrameDisplayString]) {
        let actual = self.game.marks();

        for expected in values {
            let frame = Self::marked_frame(&actual, &expected.frame);
            let where_ = format!("frame {} ", expected.frame);
            Self::assert_field(&(where_.clone() + "Mark1"), &expected.mark1, &frame.mark1);
            Self::assert_field(&(where_.clone() + "Mark2"), &expected.mark2, &frame.mark2);
            Self::assert_field(&(where_.clone() + "Mark3"), &expected.mark3, &frame.mark3);
            Self::assert_field(&(where_ + "TotalScore"), &expected.totalscore, &frame.total_score);
        }
    }

    pub fn then_game_complete_is(&mut self, values: &[Vec<String>]) {
        for row in values {
            for expected in row {
                assert_eq!(expected.trim(), self.game.is_complete().to_string(),
                           "game complete");
            }
        }
    }

    pub fn then_input_control_is(&mut self, values: &[InputControlValuesString]) {
        for expected in values {
            let actual = self.game.input_control();
            Self::assert_field("input control Frame", &expected.frame,
                               &actual.frame.to_string());
            Self::assert_field("input control Roll", &expected.roll,
                               &actual.roll.to_string());
            Self::assert_field("input control Remaining", &expected.remaining,
                               &actual.remaining.to_string());
        }
    }

    // ---- DataType checks ---------------------------------------------------

    pub fn examples_data_type_pins(&mut self, values: &[ValidValuesString]) {
        for value in values {
            assert_eq!(Pins::new(value.value.as_str()).is_ok(), Self::is_true(&value.isvalid),
                       " Value {}", value.value);
        }
    }

    pub fn examples_data_type_score(&mut self, values: &[ValidValuesString]) {
        for value in values {
            assert_eq!(Score::new(value.value.as_str()).is_ok(), Self::is_true(&value.isvalid),
                       " Value {}", value.value);
        }
    }

    // ---- helpers -----------------------------------------------------------

    /// Flattens the step's table into the pin counts it lists, in order.
    fn pin_counts(values: &[Vec<String>]) -> Vec<i32> {
        let mut result = Vec::new();
        for row in values {
            for cell in row {
                let text = cell.trim();
                if !text.is_empty() {
                    result.push(text.parse().expect("a number of pins"));
                }
            }
        }
        result
    }

    fn assert_frame_equals(&self, expected: &FrameValuesString) {
        let frame = self.numbered_frame(&expected.frame);
        let where_ = format!("frame {} ", expected.frame);

        Self::assert_field(&(where_.clone() + "Roll1"), &expected.roll1, &frame.roll1.to_string());
        Self::assert_field(&(where_.clone() + "Roll2"), &expected.roll2, &frame.roll2.to_string());
        Self::assert_field(&(where_.clone() + "Roll3"), &expected.roll3, &frame.roll3.to_string());
        Self::assert_field(&(where_.clone() + "Score"), &expected.score, &frame.score.to_string());
        Self::assert_field(&(where_ + "TotalScore"), &expected.totalscore,
                           &frame.total_score.to_string());
    }

    fn numbered_frame(&self, number: &str) -> Frame {
        for frame in self.game.frames() {
            if frame.number.to_string() == number.trim() {
                return frame;
            }
        }
        panic!("no frame numbered {}", number);
    }

    fn marked_frame(frames: &[FrameMarks], number: &str) -> FrameMarks {
        for frame in frames {
            if frame.frame == number.trim() {
                return frame.clone();
            }
        }
        panic!("no frame numbered {}", number);
    }

    /// Honours the ?DNC? marker the generated *String structs use.
    fn assert_field(what: &str, expected: &str, actual: &str) {
        if expected == DNC_STRING {
            return;
        }
        assert_eq!(expected.trim(), actual.trim(), "{}", what);
    }

    fn is_true(text: &str) -> bool {
        matches!(text.trim().to_lowercase().as_str(), "yes" | "true" | "y" | "1")
    }
}
