#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::fandc_string::FandCString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct FandCTyped {
    pub f: i32,
    pub c: i32,
    pub notes: String,
}

impl FandCTyped {
    pub fn from_str_struct(s: &FandCString) -> Self {
        Self {
            f: s.f.parse::<i32>().unwrap_or_default(),
            c: s.c.parse::<i32>().unwrap_or_default(),
            notes: s.notes.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("f".to_string(), json::Value::number_from_i64(self.f as i64)),
            ("c".to_string(), json::Value::number_from_i64(self.c as i64)),
            ("notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            f: json::as_i32(json::require(v, "f")?, "f")?,
            c: json::as_i32(json::require(v, "c")?, "c")?,
            notes: json::as_string(json::require(v, "notes")?, "notes")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[FandCTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<FandCTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "FandCTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
