use super::*;

#[derive(Debug, Clone, PartialEq)]
pub struct AddressComponents {
    pub zip: String,
    pub streetname: String,
    pub city: String,
    pub predirection: String,
    pub suffixdirection: String,
    pub state: String,
    pub suffixtype: String,
}

impl AddressComponents {
    pub fn new(zip: String, streetname: String, city: String, predirection: String, suffixdirection: String, state: String, suffixtype: String) -> Self {
        Self { zip,  streetname,  city,  predirection,  suffixdirection,  state,  suffixtype }
    }
}
