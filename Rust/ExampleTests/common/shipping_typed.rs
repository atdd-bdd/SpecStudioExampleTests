#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::shipping_string::ShippingString;

#[derive(Debug, Clone, Default)]
pub struct ShippingTyped {
    pub total_price: Dollar,
    pub shipping_cost: Dollar,
    pub notes: String,
}

impl ShippingTyped {
    pub fn from_str_struct(s: &ShippingString) -> Self {
        Self {
            total_price: Dollar::from(s.total_price.clone()),
            shipping_cost: Dollar::from(s.shipping_cost.clone()),
            notes: s.notes.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("total_price".to_string(), json::Value::Str(self.total_price.to_string())),
            ("shipping_cost".to_string(), json::Value::Str(self.shipping_cost.to_string())),
            ("notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            total_price: Dollar::from(json::as_string(json::require(v, "total_price")?, "total_price")?),
            shipping_cost: Dollar::from(json::as_string(json::require(v, "shipping_cost")?, "shipping_cost")?),
            notes: json::as_string(json::require(v, "notes")?, "notes")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ShippingTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ShippingTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ShippingTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
