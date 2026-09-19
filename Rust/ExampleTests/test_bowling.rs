#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use super::bowling_glue::BowlingGlue;

// --- Scenario Tests ---

#[test]
fn scenario_adding_a_roll() {
    let mut glue = BowlingGlue::new();
    glue.given_rolls_are(&[
        vec!["5".to_string(), "5".to_string(), "4".to_string(), "5".to_string(), "8".to_string(), "2".to_string(), "10".to_string(), "0".to_string(), "10".to_string(), "10".to_string(), "6".to_string(), "2".to_string(), "10".to_string(), "4".to_string(), "6".to_string(), "10".to_string()],
    ]);
    glue.when_roll_is(&[
        vec!["10".to_string()],
    ]);
    glue.then_rolls_become(&[
        vec!["5".to_string(), "5".to_string(), "4".to_string(), "5".to_string(), "8".to_string(), "2".to_string(), "10".to_string(), "0".to_string(), "10".to_string(), "10".to_string(), "6".to_string(), "2".to_string(), "10".to_string(), "4".to_string(), "6".to_string(), "10".to_string(), "10".to_string()],
    ]);
}

#[test]
fn scenario_full_game_compute_and_display() {
    let mut glue = BowlingGlue::new();
    glue.given_rolls_are(&[
        vec!["5".to_string(), "5".to_string(), "4".to_string(), "5".to_string(), "8".to_string(), "2".to_string(), "10".to_string(), "0".to_string(), "10".to_string(), "10".to_string(), "6".to_string(), "2".to_string(), "10".to_string(), "4".to_string(), "6".to_string(), "10".to_string(), "10".to_string()],
    ]);
    glue.when_scored();
    glue.then_display_is("| 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |\n| 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |");
}

#[test]
fn scenario_a_game_in_steps() {
    let mut glue = BowlingGlue::new();
    glue.given_rolls_are(&[
        vec!["5".to_string(), "5".to_string(), "4".to_string(), "5".to_string(), "8".to_string(), "2".to_string(), "10".to_string(), "0".to_string(), "10".to_string(), "10".to_string(), "6".to_string(), "2".to_string(), "10".to_string(), "4".to_string(), "6".to_string(), "10".to_string(), "10".to_string()],
    ]);
    glue.when_scored();
    glue.then_frame_values_are(&[
        FrameValuesString::from_vec(&["1", "5", "5", "4", "14", "14"]),
        FrameValuesString::from_vec(&["2", "4", "5", "8", "9", "23"]),
        FrameValuesString::from_vec(&["3", "8", "2", "10", "20", "43"]),
        FrameValuesString::from_vec(&["4", "10", "0", "10", "20", "63"]),
        FrameValuesString::from_vec(&["5", "0", "10", "10", "20", "83"]),
        FrameValuesString::from_vec(&["6", "10", "6", "2", "18", "101"]),
        FrameValuesString::from_vec(&["7", "6", "2", "10", "8", "109"]),
        FrameValuesString::from_vec(&["8", "10", "4", "6", "20", "129"]),
        FrameValuesString::from_vec(&["9", "4", "6", "10", "20", "149"]),
        FrameValuesString::from_vec(&["10", "10", "10", "-1", "-1", "-1"]),
    ]);
    glue.given_frame_values_are_as_previous();
    glue.then_display_values_are(&[
        FrameDisplayString::from_vec(&["1", "5", "/", "", "14"]),
        FrameDisplayString::from_vec(&["2", "4", "5", "", "23"]),
        FrameDisplayString::from_vec(&["3", "8", "/", "", "43"]),
        FrameDisplayString::from_vec(&["4", "X", "", "", "63"]),
        FrameDisplayString::from_vec(&["5", "-", "/", "", "83"]),
        FrameDisplayString::from_vec(&["6", "X", "", "", "101"]),
        FrameDisplayString::from_vec(&["7", "6", "2", "", "109"]),
        FrameDisplayString::from_vec(&["8", "X", "", "", "129"]),
        FrameDisplayString::from_vec(&["9", "4", "/", "", "149"]),
        FrameDisplayString::from_vec(&["10", "X", "X", "", ""]),
    ]);
    glue.then_game_complete_is(&[
        vec!["false".to_string()],
    ]);
    glue.then_input_control_is(&[InputControlValuesString::from_vec(&["10", "3", "10"])]);
}

#[test]
fn scenario_check_for_game_complete() {
    let mut glue = BowlingGlue::new();
    glue.given_rolls_are(&[
        vec!["5".to_string(), "5".to_string(), "4".to_string(), "5".to_string(), "8".to_string(), "2".to_string(), "10".to_string(), "0".to_string(), "10".to_string(), "10".to_string(), "6".to_string(), "2".to_string(), "10".to_string(), "4".to_string(), "6".to_string(), "10".to_string(), "10".to_string(), "10".to_string()],
    ]);
    glue.when_scored();
    glue.then_game_complete_is(&[
        vec!["true".to_string()],
    ]);
}

#[test]
fn scenario_values_for_tenth_frame() {
    let mut glue = BowlingGlue::new();
    glue.given_rolls_for_tenth_frame_are(&[
        vec!["10".to_string(), "10".to_string()],
    ]);
    glue.when_scored();
    glue.then_then_tenth_frame_values_are(&[FrameValuesString::from_vec(&["10", "10", "10", "-1", "-1", "-1"])]);
}

#[test]
fn scenario_input_control_should_be_for_next_frame() {
    let mut glue = BowlingGlue::new();
    glue.given_rolls_are(&[
        vec!["10".to_string()],
    ]);
    glue.when_scored();
    glue.then_input_control_is(&[InputControlValuesString::from_vec(&["2", "1", "10"])]);
}

#[test]
fn scenario_try_to_add_invalid_roll() {
    let mut glue = BowlingGlue::new();
    glue.given_rolls_are(&[
        vec!["5".to_string()],
    ]);
    glue.when_scored();
    glue.when_roll_is(&[
        vec!["6".to_string()],
    ]);
    glue.then_rolls_become(&[
        vec!["5".to_string()],
    ]);
}

// --- DataType Tests ---

#[test]
fn data_type_pins() {
    let mut glue = BowlingGlue::new();
    glue.examples_data_type_pins(&[
        ValidValuesString::from_vec(&["0", "true", ""]),
        ValidValuesString::from_vec(&["10", "true", ""]),
        ValidValuesString::from_vec(&["11", "false", ""]),
        ValidValuesString::from_vec(&["-2", "false", ""]),
        ValidValuesString::from_vec(&["-1", "true", "Used for To Be Rolled"]),
    ]);
}

#[test]
fn data_type_score() {
    let mut glue = BowlingGlue::new();
    glue.examples_data_type_score(&[
        ValidValuesString::from_vec(&["0", "yes", ""]),
        ValidValuesString::from_vec(&["300", "yes", ""]),
        ValidValuesString::from_vec(&["301", "no", ""]),
        ValidValuesString::from_vec(&["-1", "yes", "To be scored"]),
    ]);
}

