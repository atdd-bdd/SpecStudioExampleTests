#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use crate::record_filter_example_glue::RecordFilterExampleGlue;

// --- Scenario Tests ---

#[test]
fn scenario_filter_data_by_id() {
    let mut glue = RecordFilterExampleGlue::new();
    glue.given_list_of_numbers(&[
        IDValueString::from_vec(&["Q1234", "1"]),
        IDValueString::from_vec(&["Q9999", "2"]),
        IDValueString::from_vec(&["Q1234", "3"]),
    ]);
    glue.when_filtered_by_id_with_value(&[
        vec!["Q1234".to_string()],
    ]);
    glue.then_sum_is(&[
        vec!["4".to_string()],
    ]);
}

#[test]
fn scenario_filter_data_another_way() {
    let mut glue = RecordFilterExampleGlue::new();
    glue.given_list_of_numbers(&[
        IDValueString::from_vec(&["Q1234", "1"]),
        IDValueString::from_vec(&["Q9999", "2"]),
        IDValueString::from_vec(&["Q1234", "3"]),
    ]);
    glue.when_filtered_by(&[FilterValueString::from_vec(&["Q1234"])]);
    glue.then_result(&[ResultValueString::from_vec(&["4"])]);
}

#[test]
fn scenario_add_another_value() {
    let mut glue = RecordFilterExampleGlue::new();
    glue.given_list_of_numbers(&[
        IDValueString::from_vec(&["Q1234", "1"]),
        IDValueString::from_vec(&["Q9999", "2"]),
        IDValueString::from_vec(&["Q1234", "3"]),
    ]);
    glue.when_element_added(&[IDValueString::from_vec(&["Q1234", "4"])]);
    glue.when_filtered_by(&[FilterValueString::from_vec(&["Q1234"])]);
    glue.then_result(&[ResultValueString::from_vec(&["8"])]);
}

// --- Calculation Tests ---

#[test]
fn calculation_convert_f_to_c() {
    let mut glue = RecordFilterExampleGlue::new();
    glue.examples_calculation_convert_f_to_c(&[
        FandCString::from_vec(&["32", "0", "Freezing"]),
        FandCString::from_vec(&["212", "100", "Boiling"]),
        FandCString::from_vec(&["-40", "-40", "Below zero"]),
        FandCString::from_vec(&["68", "20", "Photo chem"]),
    ]);
}

// --- DataType Tests ---

#[test]
fn data_type_idform() {
    let mut glue = RecordFilterExampleGlue::new();
    glue.examples_data_type_idform(&[
        ValidValuesString::from_vec(&["Q1234", "true", ""]),
        ValidValuesString::from_vec(&["Q123", "false", "Too short"]),
        ValidValuesString::from_vec(&["Q12345", "false", "Too long"]),
        ValidValuesString::from_vec(&["A1234", "false", "Must begin with Q"]),
    ]);
}

