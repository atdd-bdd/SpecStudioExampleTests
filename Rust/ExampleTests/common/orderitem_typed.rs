#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::orderitem_string::OrderItemString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct OrderItemTyped {
    pub name: String,
    pub quantity: i32,
    pub price: String,
    pub itemtotal: String,
}

impl OrderItemTyped {
    pub fn from_str_struct(s: &OrderItemString) -> Self {
        Self {
            name: s.name.clone(),
            quantity: s.quantity.parse::<i32>().unwrap_or_default(),
            price: s.price.clone(),
            itemtotal: s.itemtotal.clone(),
        }
    }

    pub fn to_str_struct(&self) -> OrderItemString {
        OrderItemString {
            name: self.name.clone(),
            quantity: self.quantity.to_string(),
            price: self.price.clone(),
            itemtotal: self.itemtotal.clone(),
        }
    }

    pub fn to_string_list(list: &[OrderItemTyped]) -> Vec<OrderItemString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[OrderItemString]) -> Vec<OrderItemTyped> {
        list.iter().map(OrderItemTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Name".to_string(), json::Value::Str(self.name.clone())),
            ("Quantity".to_string(), json::Value::number_from_i64(self.quantity as i64)),
            ("Price".to_string(), json::Value::Str(self.price.clone())),
            ("ItemTotal".to_string(), json::Value::Str(self.itemtotal.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            name: json::as_string(json::require(v, "Name")?, "Name")?,
            quantity: json::as_i32(json::require(v, "Quantity")?, "Quantity")?,
            price: json::as_string(json::require(v, "Price")?, "Price")?,
            itemtotal: json::as_string(json::require(v, "ItemTotal")?, "ItemTotal")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[OrderItemTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<OrderItemTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "OrderItemTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
