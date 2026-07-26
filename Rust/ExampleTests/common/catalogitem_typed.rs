#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::catalogitem_string::CatalogItemString;

#[derive(Debug, Clone, Default)]
pub struct CatalogItemTyped {
    pub name: SimpleText,
    pub price: Dollar,
}

impl CatalogItemTyped {
    pub fn from_str_struct(s: &CatalogItemString) -> Self {
        Self {
            name: SimpleText::from(s.name.clone()),
            price: Dollar::from(s.price.clone()),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("name".to_string(), json::Value::Str(self.name.to_string())),
            ("price".to_string(), json::Value::Str(self.price.to_string())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            name: SimpleText::from(json::as_string(json::require(v, "name")?, "name")?),
            price: Dollar::from(json::as_string(json::require(v, "price")?, "price")?),
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[CatalogItemTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<CatalogItemTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "CatalogItemTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
