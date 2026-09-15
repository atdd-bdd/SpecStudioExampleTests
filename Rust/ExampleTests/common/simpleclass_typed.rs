#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::simpleclass_string::SimpleClassString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct SimpleClassTyped {
    pub anint: i32,
    pub astring: String,
}

impl SimpleClassTyped {
    pub fn from_str_struct(s: &SimpleClassString) -> Self {
        Self {
            anint: s.anint.parse::<i32>().unwrap_or_default(),
            astring: s.astring.clone(),
        }
    }

    pub fn to_str_struct(&self) -> SimpleClassString {
        SimpleClassString {
            anint: self.anint.to_string(),
            astring: self.astring.clone(),
        }
    }

    pub fn to_string_list(list: &[SimpleClassTyped]) -> Vec<SimpleClassString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[SimpleClassString]) -> Vec<SimpleClassTyped> {
        list.iter().map(SimpleClassTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("anInt".to_string(), json::Value::number_from_i64(self.anint as i64)),
            ("aString".to_string(), json::Value::Str(self.astring.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            anint: json::as_i32(json::require(v, "anInt")?, "anInt")?,
            astring: json::as_string(json::require(v, "aString")?, "aString")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[SimpleClassTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<SimpleClassTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "SimpleClassTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
