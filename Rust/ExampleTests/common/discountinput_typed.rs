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

    pub fn to_str_struct(&self) -> DiscountInputString {
        DiscountInputString {
            total_price: self.total_price.clone(),
            discount: self.discount.clone(),
            notes: self.notes.clone(),
        }
    }

    pub fn to_string_list(list: &[DiscountInputTyped]) -> Vec<DiscountInputString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[DiscountInputString]) -> Vec<DiscountInputTyped> {
        list.iter().map(DiscountInputTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Total Price".to_string(), json::Value::Str(self.total_price.clone())),
            ("Discount".to_string(), json::Value::Str(self.discount.clone())),
            ("Notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            total_price: json::as_string(json::require(v, "Total Price")?, "Total Price")?,
            discount: json::as_string(json::require(v, "Discount")?, "Discount")?,
            notes: json::as_string(json::require(v, "Notes")?, "Notes")?,
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
