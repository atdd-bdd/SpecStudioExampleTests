#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::patchtitle_string::PatchTitleString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct PatchTitleTyped {
    pub title: String,
}

impl PatchTitleTyped {
    pub fn from_str_struct(s: &PatchTitleString) -> Self {
        Self {
            title: s.title.clone(),
        }
    }

    pub fn to_str_struct(&self) -> PatchTitleString {
        PatchTitleString {
            title: self.title.clone(),
        }
    }

    pub fn to_string_list(list: &[PatchTitleTyped]) -> Vec<PatchTitleString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[PatchTitleString]) -> Vec<PatchTitleTyped> {
        list.iter().map(PatchTitleTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("title".to_string(), json::Value::Str(self.title.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            title: json::as_string(json::require(v, "title")?, "title")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[PatchTitleTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<PatchTitleTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "PatchTitleTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
