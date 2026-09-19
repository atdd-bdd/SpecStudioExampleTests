#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::newpost_string::NewPostString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct NewPostTyped {
    pub title: String,
    pub body: String,
    pub userid: i32,
}

impl NewPostTyped {
    pub fn from_str_struct(s: &NewPostString) -> Self {
        Self {
            title: s.title.clone(),
            body: s.body.clone(),
            userid: s.userid.parse::<i32>().unwrap_or_default(),
        }
    }

    pub fn to_str_struct(&self) -> NewPostString {
        NewPostString {
            title: self.title.clone(),
            body: self.body.clone(),
            userid: self.userid.to_string(),
        }
    }

    pub fn to_string_list(list: &[NewPostTyped]) -> Vec<NewPostString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[NewPostString]) -> Vec<NewPostTyped> {
        list.iter().map(NewPostTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("title".to_string(), json::Value::Str(self.title.clone())),
            ("body".to_string(), json::Value::Str(self.body.clone())),
            ("userId".to_string(), json::Value::number_from_i64(self.userid as i64)),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            title: json::as_string(json::require(v, "title")?, "title")?,
            body: json::as_string(json::require(v, "body")?, "body")?,
            userid: json::as_i32(json::require(v, "userId")?, "userId")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[NewPostTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<NewPostTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "NewPostTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
