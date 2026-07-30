#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use super::json_glue::JsonGlue;

// --- Scenario Tests ---

#[test]
fn scenario_convert_to_json() {
    let mut glue = JsonGlue::new();
    glue.given_one_object_is(&[SimpleClassString::from_vec(&["1", "B"])]);
    glue.then_json_should_be("{anInt:\"1\",aString:\"B\"}");
}

#[test]
fn scenario_convert_from_json() {
    let mut glue = JsonGlue::new();
    glue.given_json_is("{anInt:  \"1\"   ,   aString:\"B\"  }");
    glue.then_the_converted_object_is(&[SimpleClassString::from_vec(&["1", "B"])]);
}

#[test]
fn scenario_convert_to_json_array() {
    let mut glue = JsonGlue::new();
    glue.given_a_table_is(&[
        SimpleClassString::from_vec(&["1", "B"]),
        SimpleClassString::from_vec(&["2", "C"]),
    ]);
    glue.then_json_for_table_should_be("[ {anInt:\"1\",aString:\"B\"} \n, {anInt:\"2\",aString:\"C\"} \n]");
}

#[test]
fn scenario_convert_from_json_array() {
    let mut glue = JsonGlue::new();
    glue.given_json_for_table_is("[    {anInt:  \"1\"   ,   aString:\"B\"  },\n{anInt:  \"2\"   ,   aString:\"C\"  }\n]\n");
    glue.then_the_converted_table_should_be(&[
        SimpleClassString::from_vec(&["1", "B"]),
        SimpleClassString::from_vec(&["2", "C"]),
    ]);
}

