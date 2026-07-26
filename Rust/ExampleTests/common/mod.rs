#![allow(unused_imports, dead_code)]

pub mod json;
pub use json::*;
pub mod adder_string;
pub mod adder_typed;
pub mod address_string;
pub mod address_typed;
pub mod catalogitem_string;
pub mod catalogitem_typed;
pub mod discounting_string;
pub mod discounting_typed;
pub mod fandc_string;
pub mod fandc_typed;
pub mod filtervalue_string;
pub mod filtervalue_typed;
pub mod idvalue_string;
pub mod idvalue_typed;
pub mod orderitem_string;
pub mod orderitem_typed;
pub mod pricing_string;
pub mod pricing_typed;
pub mod resultvalue_string;
pub mod resultvalue_typed;
pub mod shipping_string;
pub mod shipping_typed;
pub mod shoppingcart_string;
pub mod shoppingcart_typed;
pub mod validvalues_string;
pub mod validvalues_typed;
pub use adder_string::*;
pub use adder_typed::*;
pub use address_string::*;
pub use address_typed::*;
pub use catalogitem_string::*;
pub use catalogitem_typed::*;
pub use discounting_string::*;
pub use discounting_typed::*;
pub use fandc_string::*;
pub use fandc_typed::*;
pub use filtervalue_string::*;
pub use filtervalue_typed::*;
pub use idvalue_string::*;
pub use idvalue_typed::*;
pub use orderitem_string::*;
pub use orderitem_typed::*;
pub use pricing_string::*;
pub use pricing_typed::*;
pub use resultvalue_string::*;
pub use resultvalue_typed::*;
pub use shipping_string::*;
pub use shipping_typed::*;
pub use shoppingcart_string::*;
pub use shoppingcart_typed::*;
pub use validvalues_string::*;
pub use validvalues_typed::*;

/// The Do-Not-Care marker a CompareOnly step puts in every column
/// it does not name.
pub const DNC_STRING: &str = "?DNC?";

/// Compares two cells, treating the marker as a wildcard.
pub fn dnc_equal(a: &str, b: &str) -> bool {
    a == b || a == DNC_STRING || b == DNC_STRING
}

/// Reads the Yes/No/True/False text a spec cell may hold, in any casing.
pub fn parse_bool_cell(v: &str) -> bool {
    matches!(v.trim().to_ascii_lowercase().as_str(),
             "true" | "t" | "yes" | "y" | "1")
}
