#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::filtervalue_string::FilterValueString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct FilterValueTyped {
    pub value: String,
}

impl FilterValueTyped {
    pub fn from_str_struct(s: &FilterValueString) -> Self {
        Self {
            value: s.value.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("value".to_string(), json::Value::Str(self.value.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            value: json::as_string(json::require(v, "value")?, "value")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[FilterValueTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<FilterValueTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "FilterValueTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
