#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::address_string::AddressString;

#[derive(Debug, Clone, Default)]
pub struct AddressTyped {
    pub street: SimpleText,
    pub city: SimpleText,
    pub state: SimpleText,
    pub zip: SimpleText,
}

impl AddressTyped {
    pub fn from_str_struct(s: &AddressString) -> Self {
        Self {
            street: SimpleText::from(s.street.clone()),
            city: SimpleText::from(s.city.clone()),
            state: SimpleText::from(s.state.clone()),
            zip: SimpleText::from(s.zip.clone()),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("street".to_string(), json::Value::Str(self.street.to_string())),
            ("city".to_string(), json::Value::Str(self.city.to_string())),
            ("state".to_string(), json::Value::Str(self.state.to_string())),
            ("zip".to_string(), json::Value::Str(self.zip.to_string())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            street: SimpleText::from(json::as_string(json::require(v, "street")?, "street")?),
            city: SimpleText::from(json::as_string(json::require(v, "city")?, "city")?),
            state: SimpleText::from(json::as_string(json::require(v, "state")?, "state")?),
            zip: SimpleText::from(json::as_string(json::require(v, "zip")?, "zip")?),
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
