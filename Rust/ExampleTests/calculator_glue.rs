#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;
use crate::production::Calculator;

pub struct CalculatorGlue {
    calc: Calculator,
}

impl CalculatorGlue {
    pub fn new() -> Self {
        Self { calc: Calculator::new() }
    }

    pub fn examples_calculation_add_two_numbers(&mut self, values: &[AdderString]) {
        for value in values {
            let typed = AdderTyped::from_str_struct(value);
            let actual = self.calc.add(typed.number1, typed.number2);
            assert_eq!(typed.result, actual,
                       "Add {} + {}", typed.number1, typed.number2);
        }
    }
}
