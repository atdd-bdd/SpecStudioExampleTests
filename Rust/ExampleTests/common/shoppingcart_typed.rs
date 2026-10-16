#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::shoppingcart_string::ShoppingCartString;
use super::orderitem_typed::OrderItemTyped;
use super::address_typed::AddressTyped;
use super::dollar_typed::DollarTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct ShoppingCartTyped {
    pub items: Vec<OrderItemTyped>,
    pub shipping: DollarTyped,
    pub discount: DollarTyped,
    pub totalprice: DollarTyped,
    pub shippingaddress: AddressTyped,
    pub billingaddress: AddressTyped,
}

impl ShoppingCartTyped {
    pub fn from_str_struct(s: &ShoppingCartString) -> Self {
        Self {
            items: Vec::new(),
            shipping: DollarTyped::from_str_struct(&s.shipping),
            discount: DollarTyped::from_str_struct(&s.discount),
            totalprice: DollarTyped::from_str_struct(&s.totalprice),
            shippingaddress: AddressTyped::from_str_struct(&s.shippingaddress),
            billingaddress: AddressTyped::from_str_struct(&s.billingaddress),
        }
    }

    pub fn to_str_struct(&self) -> ShoppingCartString {
        ShoppingCartString {
            items: String::new(),
            shipping: self.shipping.to_str_struct(),
            discount: self.discount.to_str_struct(),
            totalprice: self.totalprice.to_str_struct(),
            shippingaddress: self.shippingaddress.to_str_struct(),
            billingaddress: self.billingaddress.to_str_struct(),
        }
    }

    pub fn to_string_list(list: &[ShoppingCartTyped]) -> Vec<ShoppingCartString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[ShoppingCartString]) -> Vec<ShoppingCartTyped> {
        list.iter().map(ShoppingCartTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Items".to_string(), json::Value::Array(self.items.iter().map(|e| e.to_json_value()).collect())),
            ("Shipping".to_string(), json::Value::Str(self.shipping.text.clone())),
            ("Discount".to_string(), json::Value::Str(self.discount.text.clone())),
            ("TotalPrice".to_string(), json::Value::Str(self.totalprice.text.clone())),
            ("ShippingAddress".to_string(), self.shippingaddress.to_json_value()),
            ("BillingAddress".to_string(), self.billingaddress.to_json_value()),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            items: json::as_array(json::require(v, "Items")?, "Items")?.iter().map(|e| OrderItemTyped::from_json_value(e)).collect::<json::JsonResult<Vec<_>>>()?,
            shipping: DollarTyped::from(json::as_string(json::require(v, "Shipping")?, "Shipping")?),
            discount: DollarTyped::from(json::as_string(json::require(v, "Discount")?, "Discount")?),
            totalprice: DollarTyped::from(json::as_string(json::require(v, "TotalPrice")?, "TotalPrice")?),
            shippingaddress: AddressTyped::from_json_value(json::require(v, "ShippingAddress")?)?,
            billingaddress: AddressTyped::from_json_value(json::require(v, "BillingAddress")?)?,
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
