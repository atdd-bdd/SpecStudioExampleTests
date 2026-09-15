#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::validvalues_string::ValidValuesString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ValidValuesTyped {
    pub value: String,
    pub isvalid: bool,
    pub notes: String,
}

impl ValidValuesTyped {
    pub fn from_str_struct(s: &ValidValuesString) -> Self {
        Self {
            value: s.value.clone(),
            isvalid: matches!(s.isvalid.to_lowercase().as_str(), "true" | "t" | "yes" | "y" | "1"),
            notes: s.notes.clone(),
        }
    }

    pub fn to_str_struct(&self) -> ValidValuesString {
        ValidValuesString {
            value: self.value.clone(),
            isvalid: self.isvalid.to_string(),
            notes: self.notes.clone(),
        }
    }

    pub fn to_string_list(list: &[ValidValuesTyped]) -> Vec<ValidValuesString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[ValidValuesString]) -> Vec<ValidValuesTyped> {
        list.iter().map(ValidValuesTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Value".to_string(), json::Value::Str(self.value.clone())),
            ("IsValid".to_string(), json::Value::Bool(self.isvalid)),
            ("Notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            value: json::as_string(json::require(v, "Value")?, "Value")?,
            isvalid: json::as_bool(json::require(v, "IsValid")?, "IsValid")?,
            notes: json::as_string(json::require(v, "Notes")?, "Notes")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ValidValuesTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ValidValuesTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ValidValuesTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
