#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::framevalues_string::FrameValuesString;
use super::pins_typed::PinsTyped;
use super::score_typed::ScoreTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct FrameValuesTyped {
    pub frame: i32,
    pub roll1: PinsTyped,
    pub roll2: PinsTyped,
    pub roll3: PinsTyped,
    pub score: ScoreTyped,
    pub totalscore: ScoreTyped,
}

impl FrameValuesTyped {
    pub fn from_str_struct(s: &FrameValuesString) -> Self {
        Self {
            frame: s.frame.parse::<i32>().unwrap_or_default(),
            roll1: PinsTyped::from_str_struct(&s.roll1),
            roll2: PinsTyped::from_str_struct(&s.roll2),
            roll3: PinsTyped::from_str_struct(&s.roll3),
            score: ScoreTyped::from_str_struct(&s.score),
            totalscore: ScoreTyped::from_str_struct(&s.totalscore),
        }
    }

    pub fn to_str_struct(&self) -> FrameValuesString {
        FrameValuesString {
            frame: self.frame.to_string(),
            roll1: self.roll1.to_str_struct(),
            roll2: self.roll2.to_str_struct(),
            roll3: self.roll3.to_str_struct(),
            score: self.score.to_str_struct(),
            totalscore: self.totalscore.to_str_struct(),
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
            ("Roll1".to_string(), json::Value::Str(self.roll1.text.clone())),
            ("Roll2".to_string(), json::Value::Str(self.roll2.text.clone())),
            ("Roll3".to_string(), json::Value::Str(self.roll3.text.clone())),
            ("Score".to_string(), json::Value::Str(self.score.text.clone())),
            ("TotalScore".to_string(), json::Value::Str(self.totalscore.text.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            frame: json::as_i32(json::require(v, "Frame")?, "Frame")?,
            roll1: PinsTyped::from(json::as_string(json::require(v, "Roll1")?, "Roll1")?),
            roll2: PinsTyped::from(json::as_string(json::require(v, "Roll2")?, "Roll2")?),
            roll3: PinsTyped::from(json::as_string(json::require(v, "Roll3")?, "Roll3")?),
            score: ScoreTyped::from(json::as_string(json::require(v, "Score")?, "Score")?),
            totalscore: ScoreTyped::from(json::as_string(json::require(v, "TotalScore")?, "TotalScore")?),
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
