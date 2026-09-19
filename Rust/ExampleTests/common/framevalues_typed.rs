#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::framevalues_string::FrameValuesString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct FrameValuesTyped {
    pub frame: i32,
    pub roll1: String,
    pub roll2: String,
    pub roll3: String,
    pub score: String,
    pub totalscore: String,
}

impl FrameValuesTyped {
    pub fn from_str_struct(s: &FrameValuesString) -> Self {
        Self {
            frame: s.frame.parse::<i32>().unwrap_or_default(),
            roll1: s.roll1.clone(),
            roll2: s.roll2.clone(),
            roll3: s.roll3.clone(),
            score: s.score.clone(),
            totalscore: s.totalscore.clone(),
        }
    }

    pub fn to_str_struct(&self) -> FrameValuesString {
        FrameValuesString {
            frame: self.frame.to_string(),
            roll1: self.roll1.clone(),
            roll2: self.roll2.clone(),
            roll3: self.roll3.clone(),
            score: self.score.clone(),
            totalscore: self.totalscore.clone(),
        }
    }

    pub fn to_string_list(list: &[FrameValuesTyped]) -> Vec<FrameValuesString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[FrameValuesString]) -> Vec<FrameValuesTyped> {
        list.iter().map(FrameValuesTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Frame".to_string(), json::Value::number_from_i64(self.frame as i64)),
            ("Roll1".to_string(), json::Value::Str(self.roll1.clone())),
            ("Roll2".to_string(), json::Value::Str(self.roll2.clone())),
            ("Roll3".to_string(), json::Value::Str(self.roll3.clone())),
            ("Score".to_string(), json::Value::Str(self.score.clone())),
            ("TotalScore".to_string(), json::Value::Str(self.totalscore.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            frame: json::as_i32(json::require(v, "Frame")?, "Frame")?,
            roll1: json::as_string(json::require(v, "Roll1")?, "Roll1")?,
            roll2: json::as_string(json::require(v, "Roll2")?, "Roll2")?,
            roll3: json::as_string(json::require(v, "Roll3")?, "Roll3")?,
            score: json::as_string(json::require(v, "Score")?, "Score")?,
            totalscore: json::as_string(json::require(v, "TotalScore")?, "TotalScore")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[FrameValuesTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<FrameValuesTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "FrameValuesTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
