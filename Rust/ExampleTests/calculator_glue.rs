#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;

pub struct CalculatorGlue {
    // Add state fields here
}

impl CalculatorGlue {
    pub fn new() -> Self {
        Self {}
    }

    pub fn examples_calculation_add_two_numbers(&mut self, values: &[AdderString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: examples_calculation_add_two_numbers");
    }
}
