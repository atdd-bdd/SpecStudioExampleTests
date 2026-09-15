#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::addresscomponents_string::AddressComponentsString;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct AddressComponentsTyped {
    pub zip: String,
    pub streetname: String,
    pub city: String,
    pub predirection: String,
    pub suffixdirection: String,
    pub state: String,
    pub suffixtype: String,
}

impl AddressComponentsTyped {
    pub fn from_str_struct(s: &AddressComponentsString) -> Self {
        Self {
            zip: s.zip.clone(),
            streetname: s.streetname.clone(),
            city: s.city.clone(),
            predirection: s.predirection.clone(),
            suffixdirection: s.suffixdirection.clone(),
            state: s.state.clone(),
            suffixtype: s.suffixtype.clone(),
        }
    }

    pub fn to_str_struct(&self) -> AddressComponentsString {
        AddressComponentsString {
            zip: self.zip.clone(),
            streetname: self.streetname.clone(),
            city: self.city.clone(),
            predirection: self.predirection.clone(),
            suffixdirection: self.suffixdirection.clone(),
            state: self.state.clone(),
            suffixtype: self.suffixtype.clone(),
        }
    }

    pub fn to_string_list(list: &[AddressComponentsTyped]) -> Vec<AddressComponentsString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[AddressComponentsString]) -> Vec<AddressComponentsTyped> {
        list.iter().map(AddressComponentsTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("zip".to_string(), json::Value::Str(self.zip.clone())),
            ("streetName".to_string(), json::Value::Str(self.streetname.clone())),
            ("city".to_string(), json::Value::Str(self.city.clone())),
            ("preDirection".to_string(), json::Value::Str(self.predirection.clone())),
            ("suffixDirection".to_string(), json::Value::Str(self.suffixdirection.clone())),
            ("state".to_string(), json::Value::Str(self.state.clone())),
            ("suffixType".to_string(), json::Value::Str(self.suffixtype.clone())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            zip: json::as_string(json::require(v, "zip")?, "zip")?,
            streetname: json::as_string(json::require(v, "streetName")?, "streetName")?,
            city: json::as_string(json::require(v, "city")?, "city")?,
            predirection: json::as_string(json::require(v, "preDirection")?, "preDirection")?,
            suffixdirection: json::as_string(json::require(v, "suffixDirection")?, "suffixDirection")?,
            state: json::as_string(json::require(v, "state")?, "state")?,
            suffixtype: json::as_string(json::require(v, "suffixType")?, "suffixType")?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[AddressComponentsTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<AddressComponentsTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "AddressComponentsTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
