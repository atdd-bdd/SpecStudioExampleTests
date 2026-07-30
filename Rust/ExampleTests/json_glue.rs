#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;
use crate::production::simple_json::{self, Field};

pub struct JsonGlue {
    simple_class_values: Vec<SimpleClassString>,
    given_json: String,
    actual_json: String,
    parsed_object: Vec<SimpleClassString>,
}

/// simple_json takes plain name/value pairs, so it stays independent of the
/// generated test structs. These two moves are the whole of the mapping — the
/// conversion itself belongs to simple_json.
fn fields_of(value: &SimpleClassString) -> Vec<Field> {
    vec![
        Field::new("anInt", &value.anint),
        Field::new("aString", &value.astring),
    ]
}

fn object_of(fields: &[Field]) -> SimpleClassString {
    let mut s = SimpleClassString::default();
    for f in fields {
        match f.name.as_str() {
            "anInt" => s.anint = f.value.clone(),
            "aString" => s.astring = f.value.clone(),
            _ => {}
        }
    }
    s
}

impl JsonGlue {
    pub fn new() -> Self {
        Self {
            simple_class_values: Vec::new(),
            given_json: String::new(),
            actual_json: String::new(),
            parsed_object: Vec::new(),
        }
    }

    pub fn given_one_object_is(&mut self, values: &[SimpleClassString]) {
        for value in values {
            println!("{value}");
        }
        self.simple_class_values = values.to_vec();
        self.actual_json = simple_json::to_object(&fields_of(&values[0]));
    }

    pub fn then_json_should_be(&mut self, value: &str) {
        println!("{value}");
        // Text to text, with the whitespace between tokens removed from both
        // sides. Whitespace inside a quoted value is kept.
        assert_eq!(simple_json::without_whitespace(value),
                   simple_json::without_whitespace(&self.actual_json));
    }

    pub fn given_json_is(&mut self, value: &str) {
        println!("{value}");
        self.given_json = value.to_string();
        let fields = simple_json::parse_object(value).expect("bad json");
        self.parsed_object = vec![object_of(&fields)];
    }

    pub fn then_the_converted_object_is(&mut self, values: &[SimpleClassString]) {
        for value in values {
            println!("{value}");
        }
        assert_eq!(values, self.parsed_object.as_slice());
    }

    pub fn given_a_table_is(&mut self, values: &[SimpleClassString]) {
        for value in values {
            println!("{value}");
        }
        self.simple_class_values = values.to_vec();
        let rows: Vec<Vec<Field>> = values.iter().map(fields_of).collect();
        self.actual_json = simple_json::to_array(&rows);
    }

    pub fn then_json_for_table_should_be(&mut self, value: &str) {
        println!("{value}");
        assert_eq!(simple_json::without_whitespace(value),
                   simple_json::without_whitespace(&self.actual_json));
    }

    pub fn given_json_for_table_is(&mut self, value: &str) {
        println!("{value}");
        self.given_json = value.to_string();
        let rows = simple_json::parse_array(value).expect("bad json");
        self.parsed_object = rows.iter().map(|r| object_of(r)).collect();
    }

    pub fn then_the_converted_table_should_be(&mut self, values: &[SimpleClassString]) {
        for value in values {
            println!("{value}");
        }
        assert_eq!(values, self.parsed_object.as_slice());
    }
}
