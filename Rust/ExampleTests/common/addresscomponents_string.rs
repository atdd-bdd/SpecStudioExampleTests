#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct AddressComponentsString {
    pub zip: String,
    pub streetname: String,
    pub city: String,
    pub predirection: String,
    pub suffixdirection: String,
    pub state: String,
    pub suffixtype: String,
}

impl AddressComponentsString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            zip: v.get(0).copied().unwrap_or("").to_string(),
            streetname: v.get(1).copied().unwrap_or("").to_string(),
            city: v.get(2).copied().unwrap_or("").to_string(),
            predirection: v.get(3).copied().unwrap_or("").to_string(),
            suffixdirection: v.get(4).copied().unwrap_or("").to_string(),
            state: v.get(5).copied().unwrap_or("").to_string(),
            suffixtype: v.get(6).copied().unwrap_or("").to_string(),
        }
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    pub fn from_text(text: &str) -> Self {
        let parts = crate::common::tokens::require(text, 7, "AddressComponents");
        Self {
            zip: parts[0].clone(),
            streetname: parts[1].clone(),
            city: parts[2].clone(),
            predirection: parts[3].clone(),
            suffixdirection: parts[4].clone(),
            state: parts[5].clone(),
            suffixtype: parts[6].clone(),
        }
    }
}

impl std::fmt::Display for AddressComponentsString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", [crate::common::tokens::token(&self.zip), crate::common::tokens::token(&self.streetname), crate::common::tokens::token(&self.city), crate::common::tokens::token(&self.predirection), crate::common::tokens::token(&self.suffixdirection), crate::common::tokens::token(&self.state), crate::common::tokens::token(&self.suffixtype)].join(" "))
    }
}

impl PartialEq for AddressComponentsString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.zip, &other.zip)
            && crate::common::dnc_equal(&self.streetname, &other.streetname)
            && crate::common::dnc_equal(&self.city, &other.city)
            && crate::common::dnc_equal(&self.predirection, &other.predirection)
            && crate::common::dnc_equal(&self.suffixdirection, &other.suffixdirection)
            && crate::common::dnc_equal(&self.state, &other.state)
            && crate::common::dnc_equal(&self.suffixtype, &other.suffixtype)
    }
}
