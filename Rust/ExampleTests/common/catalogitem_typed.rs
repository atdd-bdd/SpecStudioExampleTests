#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::catalogitem_string::CatalogItemString;
use super::simpletext_typed::SimpleTextTyped;
use super::dollar_typed::DollarTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct CatalogItemTyped {
    pub name: SimpleTextTyped,
    pub price: DollarTyped,
}

impl CatalogItemTyped {
    pub fn from_str_struct(s: &CatalogItemString) -> Self {
        Self {
            name: SimpleTextTyped::from_str_struct(&s.name),
            price: DollarTyped::from_str_struct(&s.price),
        }
    }

    pub fn to_str_struct(&self) -> CatalogItemString {
        CatalogItemString {
            name: self.name.to_str_struct(),
            price: self.price.to_str_struct(),
        }
    }

    pub fn to_string_list(list: &[CatalogItemTyped]) -> Vec<CatalogItemString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[CatalogItemString]) -> Vec<CatalogItemTyped> {
        list.iter().map(CatalogItemTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Name".to_string(), json::Value::Str(self.name.text.clone())),
            ("Price".to_string(), json::Value::Str(self.price.text.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            name: SimpleTextTyped::from(json::as_string(json::require(v, "Name")?, "Name")?),
            price: DollarTyped::from(json::as_string(json::require(v, "Price")?, "Price")?),
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
