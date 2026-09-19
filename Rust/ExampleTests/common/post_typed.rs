#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::post_string::PostString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct PostTyped {
    pub userid: i32,
    pub id: i32,
    pub title: String,
    pub body: String,
}

impl PostTyped {
    pub fn from_str_struct(s: &PostString) -> Self {
        Self {
            userid: s.userid.parse::<i32>().unwrap_or_default(),
            id: s.id.parse::<i32>().unwrap_or_default(),
            title: s.title.clone(),
            body: s.body.clone(),
        }
    }

    pub fn to_str_struct(&self) -> PostString {
        PostString {
            userid: self.userid.to_string(),
            id: self.id.to_string(),
            title: self.title.clone(),
            body: self.body.clone(),
        }
    }

    pub fn to_string_list(list: &[PostTyped]) -> Vec<PostString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[PostString]) -> Vec<PostTyped> {
        list.iter().map(PostTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("userId".to_string(), json::Value::number_from_i64(self.userid as i64)),
            ("id".to_string(), json::Value::number_from_i64(self.id as i64)),
            ("title".to_string(), json::Value::Str(self.title.clone())),
            ("body".to_string(), json::Value::Str(self.body.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            userid: json::as_i32(json::require(v, "userId")?, "userId")?,
            id: json::as_i32(json::require(v, "id")?, "id")?,
            title: json::as_string(json::require(v, "title")?, "title")?,
            body: json::as_string(json::require(v, "body")?, "body")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[PostTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<PostTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "PostTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
