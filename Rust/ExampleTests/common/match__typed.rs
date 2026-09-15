#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::match__string::MatchString;
use super::addresscomponents_typed::AddressComponentsTyped;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct MatchTyped {
    pub matchedaddress: String,
    pub addresscomponents: AddressComponentsTyped,
}

impl MatchTyped {
    pub fn from_str_struct(s: &MatchString) -> Self {
        Self {
            matchedaddress: s.matchedaddress.clone(),
            addresscomponents: AddressComponentsTyped::from_str_struct(&s.addresscomponents),
        }
    }

    pub fn to_str_struct(&self) -> MatchString {
        MatchString {
            matchedaddress: self.matchedaddress.clone(),
            addresscomponents: self.addresscomponents.to_str_struct(),
        }
    }

    pub fn to_string_list(list: &[MatchTyped]) -> Vec<MatchString> {
        list.iter().map(|t| t.to_str_struct()).collect()
    }

    pub fn from_string_list(list: &[MatchString]) -> Vec<MatchTyped> {
        list.iter().map(MatchTyped::from_str_struct).collect()
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("matchedAddress".to_string(), json::Value::Str(self.matchedaddress.clone())),
            ("addressComponents".to_string(), self.addresscomponents.to_json_value()),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            matchedaddress: json::as_string(json::require(v, "matchedAddress")?, "matchedAddress")?,
            addresscomponents: AddressComponentsTyped::from_json_value(json::require(v, "addressComponents")?)?,
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[MatchTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<MatchTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "MatchTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
