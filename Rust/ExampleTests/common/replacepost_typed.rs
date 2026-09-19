#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::replacepost_string::ReplacePostString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ReplacePostTyped {
    pub id: i32,
    pub userid: i32,
    pub title: String,
    pub body: String,
}

impl ReplacePostTyped {
    pub fn from_str_struct(s: &ReplacePostString) -> Self {
        Self {
            id: s.id.parse::<i32>().unwrap_or_default(),
            userid: s.userid.parse::<i32>().unwrap_or_default(),
            title: s.title.clone(),
            body: s.body.clone(),
        }
    }

    pub fn to_str_struct(&self) -> ReplacePostString {
        ReplacePostString {
            id: self.id.to_string(),
            userid: self.userid.to_string(),
            title: self.title.clone(),
            body: self.body.clone(),
        }
    }

    pub fn to_string_list(list: &[ReplacePostTyped]) -> Vec<ReplacePostString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[ReplacePostString]) -> Vec<ReplacePostTyped> {
        list.iter().map(ReplacePostTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("id".to_string(), json::Value::number_from_i64(self.id as i64)),
            ("userId".to_string(), json::Value::number_from_i64(self.userid as i64)),
            ("title".to_string(), json::Value::Str(self.title.clone())),
            ("body".to_string(), json::Value::Str(self.body.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            id: json::as_i32(json::require(v, "id")?, "id")?,
            userid: json::as_i32(json::require(v, "userId")?, "userId")?,
            title: json::as_string(json::require(v, "title")?, "title")?,
            body: json::as_string(json::require(v, "body")?, "body")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ReplacePostTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ReplacePostTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ReplacePostTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
