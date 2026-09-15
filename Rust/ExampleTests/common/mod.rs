#![allow(unused_imports, dead_code)]

pub mod json;
pub use json::*;
pub mod tokens;
pub mod adder_string;
pub mod adder_typed;
pub mod address_string;
pub mod address_typed;
pub mod addresscomponents_string;
pub mod addresscomponents_typed;
pub mod cartinput_string;
pub mod cartinput_typed;
pub mod catalogitem_string;
pub mod catalogitem_typed;
pub mod discountinput_string;
pub mod discountinput_typed;
pub mod fandc_string;
pub mod fandc_typed;
pub mod filtervalue_string;
pub mod filtervalue_typed;
pub mod idvalue_string;
pub mod idvalue_typed;
pub mod itempriceinput_string;
pub mod itempriceinput_typed;
pub mod match__string;
pub mod match__typed;
pub mod orderitem_string;
pub mod orderitem_typed;
pub mod request_string;
pub mod request_typed;
pub mod response_string;
pub mod response_typed;
pub mod result_string;
pub mod result_typed;
pub mod resultvalue_string;
pub mod resultvalue_typed;
pub mod shippinginput_string;
pub mod shippinginput_typed;
pub mod shoppingcart_string;
pub mod shoppingcart_typed;
pub mod simpleclass_string;
pub mod simpleclass_typed;
pub mod status_string;
pub mod status_typed;
pub mod validvalues_string;
pub mod validvalues_typed;
pub use adder_string::*;
pub use adder_typed::*;
pub use address_string::*;
pub use address_typed::*;
pub use addresscomponents_string::*;
pub use addresscomponents_typed::*;
pub use cartinput_string::*;
pub use cartinput_typed::*;
pub use catalogitem_string::*;
pub use catalogitem_typed::*;
pub use discountinput_string::*;
pub use discountinput_typed::*;
pub use fandc_string::*;
pub use fandc_typed::*;
pub use filtervalue_string::*;
pub use filtervalue_typed::*;
pub use idvalue_string::*;
pub use idvalue_typed::*;
pub use itempriceinput_string::*;
pub use itempriceinput_typed::*;
pub use match__string::*;
pub use match__typed::*;
pub use orderitem_string::*;
pub use orderitem_typed::*;
pub use request_string::*;
pub use request_typed::*;
pub use response_string::*;
pub use response_typed::*;
pub use result_string::*;
pub use result_typed::*;
pub use resultvalue_string::*;
pub use resultvalue_typed::*;
pub use shippinginput_string::*;
pub use shippinginput_typed::*;
pub use shoppingcart_string::*;
pub use shoppingcart_typed::*;
pub use simpleclass_string::*;
pub use simpleclass_typed::*;
pub use status_string::*;
pub use status_typed::*;
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
