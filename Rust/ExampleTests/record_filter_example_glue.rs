#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;
use crate::production::{fahrenheit_to_celsius, IDForm, IDValue, RecordFilter};

pub struct RecordFilterExampleGlue {
    record_filter: RecordFilter,
    computed_sum: i32,
}

impl RecordFilterExampleGlue {
    pub fn new() -> Self {
        Self { record_filter: RecordFilter::new(), computed_sum: 0 }
    }

    pub fn given_list_of_numbers(&mut self, values: &[IDValueString]) {
        self.record_filter = RecordFilter::new();
        for value in values {
            let typed = IDValueTyped::from_str_struct(value);
            let id = IDForm::parse(&typed.id).expect("bad ID");
            self.record_filter.add(IDValue::new(id, typed.value));
        }
    }

    pub fn when_filtered_by_id_with_value(&mut self, values: &[Vec<String>]) {
        if let Some(first) = values.first().and_then(|r| r.first()) {
            let id = IDForm::parse(first).expect("bad ID");
            self.computed_sum = self.record_filter.sum_by_label(&id);
        }
    }

    pub fn then_sum_is(&mut self, values: &[Vec<String>]) {
        if let Some(first) = values.first().and_then(|r| r.first()) {
            let expected: i32 = first.trim().parse().expect("not a number");
            assert_eq!(expected, self.computed_sum, "Sum");
        }
    }

    pub fn when_filtered_by(&mut self, values: &[FilterValueString]) {
        for value in values {
            let typed = FilterValueTyped::from_str_struct(value);
            let id = IDForm::parse(&typed.value).expect("bad ID");
            self.computed_sum = self.record_filter.sum_by_label(&id);
        }
    }

    pub fn then_result(&mut self, values: &[ResultValueString]) {
        for value in values {
            let typed = ResultValueTyped::from_str_struct(value);
            assert_eq!(typed.sum, self.computed_sum, "Filtered sum");
        }
    }

    pub fn when_element_added(&mut self, values: &[IDValueString]) {
        for value in values {
            let typed = IDValueTyped::from_str_struct(value);
            let id = IDForm::parse(&typed.id).expect("bad ID");
            self.record_filter.add(IDValue::new(id, typed.value));
        }
    }

    pub fn examples_calculation_convert_f_to_c(&mut self, values: &[FandCString]) {
        for value in values {
            let typed = FandCTyped::from_str_struct(value);
            assert_eq!(typed.c, fahrenheit_to_celsius(typed.f),
                       "Convert {}F to C", typed.f);
        }
    }

    pub fn examples_data_type_idform(&mut self, values: &[ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped::from_str_struct(value);
            let ok = IDForm::parse(&vvt.value).is_ok();
            assert_eq!(vvt.isvalid, ok, " Value {}", vvt.value);
        }
    }
}
