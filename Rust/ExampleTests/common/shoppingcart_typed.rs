#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::shoppingcart_string::ShoppingCartString;

#[derive(Debug, Clone, Default)]
pub struct ShoppingCartTyped {
    pub items: OrderItemCollection,
    pub shipping: Dollar,
    pub discount: Dollar,
    pub totalprice: Dollar,
    pub shippingaddress: Address,
    pub billingaddress: Address,
}

impl ShoppingCartTyped {
    pub fn from_str_struct(s: &ShoppingCartString) -> Self {
        Self {
            items: OrderItemCollection::from(s.items.clone()),
            shipping: Dollar::from(s.shipping.clone()),
            discount: Dollar::from(s.discount.clone()),
            totalprice: Dollar::from(s.totalprice.clone()),
            shippingaddress: Address::from(s.shippingaddress.clone()),
            billingaddress: Address::from(s.billingaddress.clone()),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("items".to_string(), json::Value::Str(self.items.to_string())),
            ("shipping".to_string(), json::Value::Str(self.shipping.to_string())),
            ("discount".to_string(), json::Value::Str(self.discount.to_string())),
            ("totalprice".to_string(), json::Value::Str(self.totalprice.to_string())),
            ("shippingaddress".to_string(), json::Value::Str(self.shippingaddress.to_string())),
            ("billingaddress".to_string(), json::Value::Str(self.billingaddress.to_string())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            items: OrderItemCollection::from(json::as_string(json::require(v, "items")?, "items")?),
            shipping: Dollar::from(json::as_string(json::require(v, "shipping")?, "shipping")?),
            discount: Dollar::from(json::as_string(json::require(v, "discount")?, "discount")?),
            totalprice: Dollar::from(json::as_string(json::require(v, "totalprice")?, "totalprice")?),
            shippingaddress: Address::from(json::as_string(json::require(v, "shippingaddress")?, "shippingaddress")?),
            billingaddress: Address::from(json::as_string(json::require(v, "billingaddress")?, "billingaddress")?),
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
