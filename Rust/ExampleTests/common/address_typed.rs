#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::address_string::AddressString;
use super::simpletext_typed::SimpleTextTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct AddressTyped {
    pub street: SimpleTextTyped,
    pub city: SimpleTextTyped,
    pub state: SimpleTextTyped,
    pub zip: SimpleTextTyped,
}

impl AddressTyped {
    pub fn from_str_struct(s: &AddressString) -> Self {
        Self {
            street: SimpleTextTyped::from_str_struct(&s.street),
            city: SimpleTextTyped::from_str_struct(&s.city),
            state: SimpleTextTyped::from_str_struct(&s.state),
            zip: SimpleTextTyped::from_str_struct(&s.zip),
        }
    }

    pub fn to_str_struct(&self) -> AddressString {
        AddressString {
            street: self.street.to_str_struct(),
            city: self.city.to_str_struct(),
            state: self.state.to_str_struct(),
            zip: self.zip.to_str_struct(),
        }
    }

    pub fn to_string_list(list: &[AddressTyped]) -> Vec<AddressString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[AddressString]) -> Vec<AddressTyped> {
        list.iter().map(AddressTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("Street".to_string(), json::Value::Str(self.street.text.clone())),
            ("City".to_string(), json::Value::Str(self.city.text.clone())),
            ("State".to_string(), json::Value::Str(self.state.text.clone())),
            ("ZIP".to_string(), json::Value::Str(self.zip.text.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            street: SimpleTextTyped::from(json::as_string(json::require(v, "Street")?, "Street")?),
            city: SimpleTextTyped::from(json::as_string(json::require(v, "City")?, "City")?),
            state: SimpleTextTyped::from(json::as_string(json::require(v, "State")?, "State")?),
            zip: SimpleTextTyped::from(json::as_string(json::require(v, "ZIP")?, "ZIP")?),
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[AddressTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<AddressTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "AddressTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
