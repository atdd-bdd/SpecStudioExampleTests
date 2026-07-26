#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::itempriceinput_string::ItemPriceInputString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ItemPriceInputTyped {
    pub totalitems: String,
}

impl ItemPriceInputTyped {
    pub fn from_str_struct(s: &ItemPriceInputString) -> Self {
        Self {
            totalitems: s.totalitems.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("totalitems".to_string(), json::Value::Str(self.totalitems.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            totalitems: json::as_string(json::require(v, "totalitems")?, "totalitems")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ItemPriceInputTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ItemPriceInputTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ItemPriceInputTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
