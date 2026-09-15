#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::adder_string::AdderString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct AdderTyped {
    pub number1: i32,
    pub number2: i32,
    pub result: i32,
}

impl AdderTyped {
    pub fn from_str_struct(s: &AdderString) -> Self {
        Self {
            number1: s.number1.parse::<i32>().unwrap_or_default(),
            number2: s.number2.parse::<i32>().unwrap_or_default(),
            result: s.result.parse::<i32>().unwrap_or_default(),
        }
    }

    pub fn to_str_struct(&self) -> AdderString {
        AdderString {
            number1: self.number1.to_string(),
            number2: self.number2.to_string(),
            result: self.result.to_string(),
        }
    }

    pub fn to_string_list(list: &[AdderTyped]) -> Vec<AdderString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[AdderString]) -> Vec<AdderTyped> {
        list.iter().map(AdderTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("number1".to_string(), json::Value::number_from_i64(self.number1 as i64)),
            ("number2".to_string(), json::Value::number_from_i64(self.number2 as i64)),
            ("result".to_string(), json::Value::number_from_i64(self.result as i64)),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            number1: json::as_i32(json::require(v, "number1")?, "number1")?,
            number2: json::as_i32(json::require(v, "number2")?, "number2")?,
            result: json::as_i32(json::require(v, "result")?, "result")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[AdderTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<AdderTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "AdderTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
