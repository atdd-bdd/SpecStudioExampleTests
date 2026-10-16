#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::shippinginput_string::ShippingInputString;
use super::dollar_typed::DollarTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ShippingInputTyped {
    pub total_price: DollarTyped,
    pub shipping_cost: DollarTyped,
    pub notes: String,
}

impl ShippingInputTyped {
    pub fn from_str_struct(s: &ShippingInputString) -> Self {
        Self {
            total_price: DollarTyped::from_str_struct(&s.total_price),
            shipping_cost: DollarTyped::from_str_struct(&s.shipping_cost),
            notes: s.notes.clone(),
        }
    }

    pub fn to_str_struct(&self) -> ShippingInputString {
        ShippingInputString {
            total_price: self.total_price.to_str_struct(),
            shipping_cost: self.shipping_cost.to_str_struct(),
            notes: self.notes.clone(),
        }
    }

    pub fn to_string_list(list: &[ShippingInputTyped]) -> Vec<ShippingInputString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[ShippingInputString]) -> Vec<ShippingInputTyped> {
        list.iter().map(ShippingInputTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Total Price".to_string(), json::Value::Str(self.total_price.text.clone())),
            ("Shipping Cost".to_string(), json::Value::Str(self.shipping_cost.text.clone())),
            ("Notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            total_price: DollarTyped::from(json::as_string(json::require(v, "Total Price")?, "Total Price")?),
            shipping_cost: DollarTyped::from(json::as_string(json::require(v, "Shipping Cost")?, "Shipping Cost")?),
            notes: json::as_string(json::require(v, "Notes")?, "Notes")?,
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
