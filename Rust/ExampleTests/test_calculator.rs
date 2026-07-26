#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use super::calculator_glue::CalculatorGlue;

// --- Calculation Tests ---

#[test]
fn calculation_add_two_numbers() {
    let mut glue = CalculatorGlue::new();
    glue.examples_calculation_add_two_numbers(&[
        AdderString::from_vec(&["2", "3", "5"]),
        AdderString::from_vec(&["10", "20", "30"]),
        AdderString::from_vec(&["-1", "1", "0"]),
    ]);
}

