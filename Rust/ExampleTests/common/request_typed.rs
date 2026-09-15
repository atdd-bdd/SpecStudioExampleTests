#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::request_string::RequestString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct RequestTyped {
    pub method: String,
    pub page: String,
    pub address: String,
    pub benchmark: String,
    pub format: String,
}

impl RequestTyped {
    pub fn from_str_struct(s: &RequestString) -> Self {
        Self {
            method: s.method.clone(),
            page: s.page.clone(),
            address: s.address.clone(),
            benchmark: s.benchmark.clone(),
            format: s.format.clone(),
        }
    }

    pub fn to_str_struct(&self) -> RequestString {
        RequestString {
            method: self.method.clone(),
            page: self.page.clone(),
            address: self.address.clone(),
            benchmark: self.benchmark.clone(),
            format: self.format.clone(),
        }
    }

    pub fn to_string_list(list: &[RequestTyped]) -> Vec<RequestString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[RequestString]) -> Vec<RequestTyped> {
        list.iter().map(RequestTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Method".to_string(), json::Value::Str(self.method.clone())),
            ("Page".to_string(), json::Value::Str(self.page.clone())),
            ("Address".to_string(), json::Value::Str(self.address.clone())),
            ("Benchmark".to_string(), json::Value::Str(self.benchmark.clone())),
            ("Format".to_string(), json::Value::Str(self.format.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            method: json::as_string(json::require(v, "Method")?, "Method")?,
            page: json::as_string(json::require(v, "Page")?, "Page")?,
            address: json::as_string(json::require(v, "Address")?, "Address")?,
            benchmark: json::as_string(json::require(v, "Benchmark")?, "Benchmark")?,
            format: json::as_string(json::require(v, "Format")?, "Format")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[RequestTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<RequestTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "RequestTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
