use super::*;

#[derive(Debug, Clone, PartialEq)]
pub struct Match {
    pub matchedaddress: String,
    pub addresscomponents: AddressComponents,
}

impl Match {
    pub fn new(matchedaddress: String, addresscomponents: AddressComponents) -> Self {
        Self { matchedaddress,  addresscomponents }
    }
}
