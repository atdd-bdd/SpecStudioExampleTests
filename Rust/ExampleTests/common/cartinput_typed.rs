#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::cartinput_string::CartInputString;
use super::dollar_typed::DollarTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct CartInputTyped {
    pub totalitems: DollarTyped,
    pub shipping: DollarTyped,
    pub discount: DollarTyped,
    pub total_price: DollarTyped,
    pub notes: String,
}

impl CartInputTyped {
    pub fn from_str_struct(s: &CartInputString) -> Self {
        Self {
            totalitems: DollarTyped::from_str_struct(&s.totalitems),
            shipping: DollarTyped::from_str_struct(&s.shipping),
            discount: DollarTyped::from_str_struct(&s.discount),
            total_price: DollarTyped::from_str_struct(&s.total_price),
            notes: s.notes.clone(),
        }
    }

    pub fn to_str_struct(&self) -> CartInputString {
        CartInputString {
            totalitems: self.totalitems.to_str_struct(),
            shipping: self.shipping.to_str_struct(),
            discount: self.discount.to_str_struct(),
            total_price: self.total_price.to_str_struct(),
            notes: self.notes.clone(),
        }
    }

    pub fn to_string_list(list: &[CartInputTyped]) -> Vec<CartInputString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[CartInputString]) -> Vec<CartInputTyped> {
        list.iter().map(CartInputTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("TotalItems".to_string(), json::Value::Str(self.totalitems.text.clone())),
            ("Shipping".to_string(), json::Value::Str(self.shipping.text.clone())),
            ("Discount".to_string(), json::Value::Str(self.discount.text.clone())),
            ("Total Price".to_string(), json::Value::Str(self.total_price.text.clone())),
            ("Notes".to_string(), json::Value::Str(self.notes.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            totalitems: DollarTyped::from(json::as_string(json::require(v, "TotalItems")?, "TotalItems")?),
            shipping: DollarTyped::from(json::as_string(json::require(v, "Shipping")?, "Shipping")?),
            discount: DollarTyped::from(json::as_string(json::require(v, "Discount")?, "Discount")?),
            total_price: DollarTyped::from(json::as_string(json::require(v, "Total Price")?, "Total Price")?),
            notes: json::as_string(json::require(v, "Notes")?, "Notes")?,
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
