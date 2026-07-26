#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::idvalue_string::IDValueString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct IDValueTyped {
    pub id: String,
    pub value: i32,
}

impl IDValueTyped {
    pub fn from_str_struct(s: &IDValueString) -> Self {
        Self {
            id: s.id.clone(),
            value: s.value.parse::<i32>().unwrap_or_default(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("id".to_string(), json::Value::Str(self.id.clone())),
            ("value".to_string(), json::Value::number_from_i64(self.value as i64)),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            id: json::as_string(json::require(v, "id")?, "id")?,
            value: json::as_i32(json::require(v, "value")?, "value")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[IDValueTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<IDValueTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "IDValueTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
