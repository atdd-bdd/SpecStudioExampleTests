#![allow(dead_code, unused_imports, unused_variables)]

#[derive(Debug, Clone, Default)]
pub struct AddressString {
    pub street: String,
    pub city: String,
    pub state: String,
    pub zip: String,
}

impl AddressString {
    pub fn from_vec(v: &[&str]) -> Self {
        Self {
            street: v.get(0).copied().unwrap_or("").to_string(),
            city: v.get(1).copied().unwrap_or("").to_string(),
            state: v.get(2).copied().unwrap_or("").to_string(),
            zip: v.get(3).copied().unwrap_or("").to_string(),
        }
    }
}

impl std::fmt::Display for AddressString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f,
            "Street={}, City={}, State={}, ZIP={}",
            self.street,
            self.city,
            self.state,
            self.zip
        )
    }
}

impl PartialEq for AddressString {
    fn eq(&self, other: &Self) -> bool {
        crate::common::dnc_equal(&self.street, &other.street)
            && crate::common::dnc_equal(&self.city, &other.city)
            && crate::common::dnc_equal(&self.state, &other.state)
            && crate::common::dnc_equal(&self.zip, &other.zip)
    }
}
