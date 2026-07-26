#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;
use crate::production::{Dollar, SimpleText};

pub struct TypesGlue {}

impl TypesGlue {
    pub fn new() -> Self { Self {} }

    pub fn examples_data_type_dollar(&mut self, values: &[ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped::from_str_struct(value);
            let ok = Dollar::parse(&vvt.value).is_ok();
            assert_eq!(vvt.isvalid, ok, " Value {}", vvt.value);
        }
    }

    pub fn examples_data_type_simpletext(&mut self, values: &[ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped::from_str_struct(value);
            let ok = SimpleText::parse(&vvt.value).is_ok();
            assert_eq!(vvt.isvalid, ok, " Value {}", vvt.value);
        }
    }
}
