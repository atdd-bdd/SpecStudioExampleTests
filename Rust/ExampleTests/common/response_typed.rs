#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::response_string::ResponseString;
use super::result_typed::ResultTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ResponseTyped {
    pub result: ResultTyped,
}

impl ResponseTyped {
    pub fn from_str_struct(s: &ResponseString) -> Self {
        Self {
            result: ResultTyped::from_str_struct(&s.result),
        }
    }

    pub fn to_str_struct(&self) -> ResponseString {
        ResponseString {
            result: self.result.to_str_struct(),
        }
    }

    pub fn to_string_list(list: &[ResponseTyped]) -> Vec<ResponseString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[ResponseString]) -> Vec<ResponseTyped> {
        list.iter().map(ResponseTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("result".to_string(), self.result.to_json_value()),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            result: ResultTyped::from_json_value(json::require(v, "result")?)?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ResponseTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ResponseTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ResponseTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
