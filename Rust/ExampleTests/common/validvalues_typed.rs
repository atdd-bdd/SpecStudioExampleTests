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

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("value".to_string(), json::Value::Str(self.value.clone())),
            ("isvalid".to_string(), json::Value::Bool(self.isvalid)),
            ("notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            value: json::as_string(json::require(v, "value")?, "value")?,
            isvalid: json::as_bool(json::require(v, "isvalid")?, "isvalid")?,
            notes: json::as_string(json::require(v, "notes")?, "notes")?,
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
