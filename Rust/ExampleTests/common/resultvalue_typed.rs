#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::resultvalue_string::ResultValueString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ResultValueTyped {
    pub sum: i32,
}

impl ResultValueTyped {
    pub fn from_str_struct(s: &ResultValueString) -> Self {
        Self {
            sum: s.sum.parse::<i32>().unwrap_or_default(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("sum".to_string(), json::Value::number_from_i64(self.sum as i64)),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            sum: json::as_i32(json::require(v, "sum")?, "sum")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ResultValueTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ResultValueTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ResultValueTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
