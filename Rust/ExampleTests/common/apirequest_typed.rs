#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::apirequest_string::ApiRequestString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ApiRequestTyped {
    pub method: String,
    pub page: String,
    pub parameter: String,
    pub body: String,
}

impl ApiRequestTyped {
    pub fn from_str_struct(s: &ApiRequestString) -> Self {
        Self {
            method: s.method.clone(),
            page: s.page.clone(),
            parameter: s.parameter.clone(),
            body: s.body.clone(),
        }
    }

    pub fn to_str_struct(&self) -> ApiRequestString {
        ApiRequestString {
            method: self.method.clone(),
            page: self.page.clone(),
            parameter: self.parameter.clone(),
            body: self.body.clone(),
        }
    }

    pub fn to_string_list(list: &[ApiRequestTyped]) -> Vec<ApiRequestString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[ApiRequestString]) -> Vec<ApiRequestTyped> {
        list.iter().map(ApiRequestTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Method".to_string(), json::Value::Str(self.method.clone())),
            ("Page".to_string(), json::Value::Str(self.page.clone())),
            ("Parameter".to_string(), json::Value::Str(self.parameter.clone())),
            ("Body".to_string(), json::Value::Str(self.body.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            method: json::as_string(json::require(v, "Method")?, "Method")?,
            page: json::as_string(json::require(v, "Page")?, "Page")?,
            parameter: json::as_string(json::require(v, "Parameter")?, "Parameter")?,
            body: json::as_string(json::require(v, "Body")?, "Body")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ApiRequestTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ApiRequestTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ApiRequestTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
