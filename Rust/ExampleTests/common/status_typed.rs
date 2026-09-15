#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::status_string::StatusString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct StatusTyped {
    pub code: i32,
}

impl StatusTyped {
    pub fn from_str_struct(s: &StatusString) -> Self {
        Self {
            code: s.code.parse::<i32>().unwrap_or_default(),
        }
    }

    pub fn to_str_struct(&self) -> StatusString {
        StatusString {
            code: self.code.to_string(),
        }
    }

    pub fn to_string_list(list: &[StatusTyped]) -> Vec<StatusString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[StatusString]) -> Vec<StatusTyped> {
        list.iter().map(StatusTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Code".to_string(), json::Value::number_from_i64(self.code as i64)),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            code: json::as_i32(json::require(v, "Code")?, "Code")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[StatusTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<StatusTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "StatusTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
