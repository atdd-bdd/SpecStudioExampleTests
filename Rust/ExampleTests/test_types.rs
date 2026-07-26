#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use super::types_glue::TypesGlue;

// --- DataType Tests ---

#[test]
fn data_type_dollar() {
    let mut glue = TypesGlue::new();
    glue.examples_data_type_dollar(&[
        ValidValuesString::from_vec(&["0", "true", ""]),
        ValidValuesString::from_vec(&["0.01", "true", ""]),
        ValidValuesString::from_vec(&["-1", "false", "Negative not allowed"]),
        ValidValuesString::from_vec(&["0.001", "false", "Only 2 decimal digits"]),
    ]);
}

#[test]
fn data_type_simpletext() {
    let mut glue = TypesGlue::new();
    glue.examples_data_type_simpletext(&[
        ValidValuesString::from_vec(&["abc", "y", ""]),
        ValidValuesString::from_vec(&["ab.", "y", "period okay"]),
        ValidValuesString::from_vec(&["1234567890", "y", "digits"]),
        ValidValuesString::from_vec(&["@", "n", ""]),
        ValidValuesString::from_vec(&["-a-b", "y", "hyphens"]),
    ]);
}

