#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::cartinput_string::CartInputString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct CartInputTyped {
    pub totalitems: String,
    pub shipping: String,
    pub discount: String,
    pub total_price: String,
    pub notes: String,
}

impl CartInputTyped {
    pub fn from_str_struct(s: &CartInputString) -> Self {
        Self {
            totalitems: s.totalitems.clone(),
            shipping: s.shipping.clone(),
            discount: s.discount.clone(),
            total_price: s.total_price.clone(),
            notes: s.notes.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("totalitems".to_string(), json::Value::Str(self.totalitems.clone())),
            ("shipping".to_string(), json::Value::Str(self.shipping.clone())),
            ("discount".to_string(), json::Value::Str(self.discount.clone())),
            ("total_price".to_string(), json::Value::Str(self.total_price.clone())),
            ("notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            totalitems: json::as_string(json::require(v, "totalitems")?, "totalitems")?,
            shipping: json::as_string(json::require(v, "shipping")?, "shipping")?,
            discount: json::as_string(json::require(v, "discount")?, "discount")?,
            total_price: json::as_string(json::require(v, "total_price")?, "total_price")?,
            notes: json::as_string(json::require(v, "notes")?, "notes")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[CartInputTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<CartInputTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "CartInputTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
