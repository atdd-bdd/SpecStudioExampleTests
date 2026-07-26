#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::shippinginput_string::ShippingInputString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ShippingInputTyped {
    pub total_price: String,
    pub shipping_cost: String,
    pub notes: String,
}

impl ShippingInputTyped {
    pub fn from_str_struct(s: &ShippingInputString) -> Self {
        Self {
            total_price: s.total_price.clone(),
            shipping_cost: s.shipping_cost.clone(),
            notes: s.notes.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("total_price".to_string(), json::Value::Str(self.total_price.clone())),
            ("shipping_cost".to_string(), json::Value::Str(self.shipping_cost.clone())),
            ("notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            total_price: json::as_string(json::require(v, "total_price")?, "total_price")?,
            shipping_cost: json::as_string(json::require(v, "shipping_cost")?, "shipping_cost")?,
            notes: json::as_string(json::require(v, "notes")?, "notes")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ShippingInputTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ShippingInputTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ShippingInputTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
