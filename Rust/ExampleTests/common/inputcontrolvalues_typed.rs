#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::inputcontrolvalues_string::InputControlValuesString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct InputControlValuesTyped {
    pub frame: i32,
    pub roll: String,
    pub remaining: String,
}

impl InputControlValuesTyped {
    pub fn from_str_struct(s: &InputControlValuesString) -> Self {
        Self {
            frame: s.frame.parse::<i32>().unwrap_or_default(),
            roll: s.roll.clone(),
            remaining: s.remaining.clone(),
        }
    }

    pub fn to_str_struct(&self) -> InputControlValuesString {
        InputControlValuesString {
            frame: self.frame.to_string(),
            roll: self.roll.clone(),
            remaining: self.remaining.clone(),
        }
    }

    pub fn to_string_list(list: &[InputControlValuesTyped]) -> Vec<InputControlValuesString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[InputControlValuesString]) -> Vec<InputControlValuesTyped> {
        list.iter().map(InputControlValuesTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Frame".to_string(), json::Value::number_from_i64(self.frame as i64)),
            ("Roll".to_string(), json::Value::Str(self.roll.clone())),
            ("Remaining".to_string(), json::Value::Str(self.remaining.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            frame: json::as_i32(json::require(v, "Frame")?, "Frame")?,
            roll: json::as_string(json::require(v, "Roll")?, "Roll")?,
            remaining: json::as_string(json::require(v, "Remaining")?, "Remaining")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[InputControlValuesTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<InputControlValuesTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "InputControlValuesTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
