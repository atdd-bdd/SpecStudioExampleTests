#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::address_string::AddressString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct AddressTyped {
    pub street: String,
    pub city: String,
    pub state: String,
    pub zip: String,
}

impl AddressTyped {
    pub fn from_str_struct(s: &AddressString) -> Self {
        Self {
            street: s.street.clone(),
            city: s.city.clone(),
            state: s.state.clone(),
            zip: s.zip.clone(),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("street".to_string(), json::Value::Str(self.street.clone())),
            ("city".to_string(), json::Value::Str(self.city.clone())),
            ("state".to_string(), json::Value::Str(self.state.clone())),
            ("zip".to_string(), json::Value::Str(self.zip.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            street: json::as_string(json::require(v, "street")?, "street")?,
            city: json::as_string(json::require(v, "city")?, "city")?,
            state: json::as_string(json::require(v, "state")?, "state")?,
            zip: json::as_string(json::require(v, "zip")?, "zip")?,
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
