#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::framedisplay_string::FrameDisplayString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct FrameDisplayTyped {
    pub frame: String,
    pub mark1: String,
    pub mark2: String,
    pub mark3: String,
    pub totalscore: String,
}

impl FrameDisplayTyped {
    pub fn from_str_struct(s: &FrameDisplayString) -> Self {
        Self {
            frame: s.frame.clone(),
            mark1: s.mark1.clone(),
            mark2: s.mark2.clone(),
            mark3: s.mark3.clone(),
            totalscore: s.totalscore.clone(),
        }
    }

    pub fn to_str_struct(&self) -> FrameDisplayString {
        FrameDisplayString {
            frame: self.frame.clone(),
            mark1: self.mark1.clone(),
            mark2: self.mark2.clone(),
            mark3: self.mark3.clone(),
            totalscore: self.totalscore.clone(),
        }
    }

    pub fn to_string_list(list: &[FrameDisplayTyped]) -> Vec<FrameDisplayString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[FrameDisplayString]) -> Vec<FrameDisplayTyped> {
        list.iter().map(FrameDisplayTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Frame".to_string(), json::Value::Str(self.frame.clone())),
            ("Mark1".to_string(), json::Value::Str(self.mark1.clone())),
            ("Mark2".to_string(), json::Value::Str(self.mark2.clone())),
            ("Mark3".to_string(), json::Value::Str(self.mark3.clone())),
            ("TotalScore".to_string(), json::Value::Str(self.totalscore.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            frame: json::as_string(json::require(v, "Frame")?, "Frame")?,
            mark1: json::as_string(json::require(v, "Mark1")?, "Mark1")?,
            mark2: json::as_string(json::require(v, "Mark2")?, "Mark2")?,
            mark3: json::as_string(json::require(v, "Mark3")?, "Mark3")?,
            totalscore: json::as_string(json::require(v, "TotalScore")?, "TotalScore")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[FrameDisplayTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<FrameDisplayTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "FrameDisplayTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
