#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::shoppingcart_string::ShoppingCartString;
use super::address_typed::AddressTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ShoppingCartTyped {
    pub items: String,
    pub shipping: String,
    pub discount: String,
    pub totalprice: String,
    pub shippingaddress: AddressTyped,
    pub billingaddress: AddressTyped,
}

impl ShoppingCartTyped {
    pub fn from_str_struct(s: &ShoppingCartString) -> Self {
        Self {
            items: s.items.clone(),
            shipping: s.shipping.clone(),
            discount: s.discount.clone(),
            totalprice: s.totalprice.clone(),
            shippingaddress: AddressTyped::from_str_struct(&s.shippingaddress),
            billingaddress: AddressTyped::from_str_struct(&s.billingaddress),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("items".to_string(), json::Value::Str(self.items.clone())),
            ("shipping".to_string(), json::Value::Str(self.shipping.clone())),
            ("discount".to_string(), json::Value::Str(self.discount.clone())),
            ("totalprice".to_string(), json::Value::Str(self.totalprice.clone())),
            ("shippingaddress".to_string(), self.shippingaddress.to_json_value()),
            ("billingaddress".to_string(), self.billingaddress.to_json_value()),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            items: json::as_string(json::require(v, "items")?, "items")?,
            shipping: json::as_string(json::require(v, "shipping")?, "shipping")?,
            discount: json::as_string(json::require(v, "discount")?, "discount")?,
            totalprice: json::as_string(json::require(v, "totalprice")?, "totalprice")?,
            shippingaddress: AddressTyped::from_json_value(json::require(v, "shippingaddress")?)?,
            billingaddress: AddressTyped::from_json_value(json::require(v, "billingaddress")?)?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[ShoppingCartTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<ShoppingCartTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "ShoppingCartTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
