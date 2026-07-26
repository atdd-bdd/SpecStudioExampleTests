#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;

pub struct TypesGlue {
    // Add state fields here
}

impl TypesGlue {
    pub fn new() -> Self {
        Self {}
    }

    pub fn examples_data_type_dollar(&mut self, values: &[ValidValuesString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: examples_data_type_dollar");
    }

    pub fn examples_data_type_simpletext(&mut self, values: &[ValidValuesString]) {
        for value in values { println!("{:?}", value); }
        panic!("Not implemented: examples_data_type_simpletext");
    }
}
