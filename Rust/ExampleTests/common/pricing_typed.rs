#![allow(dead_code, unused_imports, unused_variables)]

use super::json;
use super::pricing_string::PricingString;

#[derive(Debug, Clone, Default)]
pub struct PricingTyped {
    pub totalprice: Dollar,
}

impl PricingTyped {
    pub fn from_str_struct(s: &PricingString) -> Self {
        Self {
            totalprice: Dollar::from(s.totalprice.clone()),
        }
    }

    pub fn to_json_value(&self) -> json::Value {
        json::Value::Object(vec![
            ("totalprice".to_string(), json::Value::Str(self.totalprice.to_string())),
        ])
    }

    pub fn to_json(&self) -> String {
        json::write(&self.to_json_value())
    }

    pub fn from_json_value(v: &json::Value) -> json::JsonResult<Self> {
        Ok(Self {
            totalprice: Dollar::from(json::as_string(json::require(v, "totalprice")?, "totalprice")?),
        })
    }

    pub fn from_json(text: &str) -> json::JsonResult<Self> {
        Self::from_json_value(&json::parse(text)?)
    }

    pub fn to_json_list(list: &[PricingTyped]) -> String {
        json::write(&json::Value::Array(
            list.iter().map(|item| item.to_json_value()).collect(),
        ))
    }

    pub fn from_json_list(text: &str) -> json::JsonResult<Vec<PricingTyped>> {
        let root = json::parse(text)?;
        let items = json::as_array(&root, "PricingTyped")?;
        let mut result = Vec::with_capacity(items.len());
        for e in items {
            result.push(Self::from_json_value(e)?);
        }
        Ok(result)
    }
}
