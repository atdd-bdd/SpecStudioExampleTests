#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::result_string::ResultString;
use super::match__typed::MatchTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ResultTyped {
    pub addressmatches: Vec<MatchTyped>,
}

impl ResultTyped {
    pub fn from_str_struct(s: &ResultString) -> Self {
        Self {
            addressmatches: Vec::new(),
        }
    }

    pub fn to_str_struct(&self) -> ResultString {
        ResultString {
            addressmatches: String::new(),
        }
    }

    pub fn to_string_list(list: &[ResultTyped]) -> Vec<ResultString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[ResultString]) -> Vec<ResultTyped> {
        list.iter().map(ResultTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("addressMatches".to_string(), json::Value::Array(self.addressmatches.iter().map(|e| e.to_json_value()).collect())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            addressmatches: json::as_array(json::require(v, "addressMatches")?, "addressMatches")?.iter().map(|e| MatchTyped::from_json_value(e)).collect::<json::JsonResult<Vec<_>>>()?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ResultTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ResultTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ResultTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
