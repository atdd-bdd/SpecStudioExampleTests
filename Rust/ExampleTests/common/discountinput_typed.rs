#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::discountinput_string::DiscountInputString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct DiscountInputTyped {
    pub total_price: String,
    pub discount: String,
    pub notes: String,
}

impl DiscountInputTyped {
    pub fn from_str_struct(s: &DiscountInputString) -> Self {
        Self {
            total_price: s.total_price.clone(),
            discount: s.discount.clone(),
            notes: s.notes.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("total_price".to_string(), json::Value::Str(self.total_price.clone())),
            ("discount".to_string(), json::Value::Str(self.discount.clone())),
            ("notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            total_price: json::as_string(json::require(v, "total_price")?, "total_price")?,
            discount: json::as_string(json::require(v, "discount")?, "discount")?,
            notes: json::as_string(json::require(v, "notes")?, "notes")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[DiscountInputTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<DiscountInputTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "DiscountInputTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
