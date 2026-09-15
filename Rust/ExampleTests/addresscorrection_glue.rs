#![allow(dead_code, unused_variables, unused_imports)]

use crate::common::*;
use crate::rest_call::RestCall;

/// Glue for a specification that tests a live service.
///
/// There are no production classes: the Census Bureau geocoder is the thing
/// under test. So this file does only three things -- build the call, hand the
/// reply to the generated from_json, and compare. It never touches the JSON
/// itself.
///
/// That is possible because the attribute sets in the specification mirror the
/// shape of the reply, so ResponseTyped::from_json reads all of it. Glue
/// navigating a reply is a sign the specification is not describing it honestly.
pub struct AddressCorrectionGlue {
    base_url: String,
    response: Option<RestCall>,
}

impl AddressCorrectionGlue {
    pub fn new() -> Self {
        Self { base_url: String::new(), response: None }
    }

    pub fn given_base_page_is(&mut self, values: &[Vec<String>]) {
        self.base_url = values[0][0].clone();
    }

    pub fn when_sending_request(&mut self, values: &[RequestString]) {
        let request = &values[0];
        match RestCall::send(&request.method, &self.base_url, &request.page,
                             &query(request), "") {
            Ok(call) => self.response = Some(call),
            Err(error) => panic!("{}", error),
        }
    }

    pub fn then_response_status_is(&mut self, values: &[StatusString]) {
        let call = self.call();
        // Code is declared Integer, so it arrives as i32; RestCall carries the
        // HTTP status as the u16 it actually is.
        let want = StatusTyped::from_str_struct(&values[0]).code;
        assert_eq!(want, i32::from(call.status), "HTTP status from {}", call.url);
    }

    pub fn then_the_matched_addresses_are(&mut self, values: &[MatchString]) {
        let actual = self.matches();
        assert_eq!(values.len(), actual.len(),
                   "number of matches\n  expected: {:?}\n  actual:   {:?}", values, actual);

        // Compared as a set rather than in order: each expected row must find an
        // actual row it has not already claimed. A test that fails because a
        // service reordered its results is testing the wrong thing.
        //
        // The comparison is on the String form, not the Typed one. Only the
        // String structs skip a field holding ?DNC?, which is what makes a
        // CompareOnly table check its own columns and no others.
        let mut remaining = actual.clone();
        for expected in values {
            match remaining.iter().position(|candidate| candidate == expected) {
                Some(found) => { remaining.remove(found); }
                None => panic!("no returned address matched {:?}\n  remaining: {:?}",
                               expected, remaining),
            }
        }
    }

    pub fn then_there_are_no_matched_addresses(&mut self) {
        assert_eq!(0, self.matches().len(),
                   "expected no match for an address that does not exist");
    }

    // ---- the two translations ---------------------------------------------

    fn call(&self) -> &RestCall {
        self.response.as_ref().expect("no request was sent")
    }

    /// The reply, read by the generated reader, as the rows a table compares.
    fn matches(&self) -> Vec<MatchString> {
        let reply = ResponseTyped::from_json(&self.call().body).expect("a Response");
        MatchTyped::to_string_list(&reply.result.addressmatches)
    }
}

/// The query string the geocoder expects, from the fields of the table.
fn query(request: &RequestString) -> String {
    format!("?address={}&benchmark={}&format={}",
            encode(&request.address), encode(&request.benchmark), encode(&request.format))
}

/// Percent-encoding for a query value. Only the characters these addresses
/// actually contain need escaping, and writing it here keeps the crate free of
/// dependencies for the same reason rest_call shells out to curl.
fn encode(value: &str) -> String {
    let mut out = String::with_capacity(value.len());
    for byte in value.as_bytes() {
        match byte {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'_' | b'.' | b'~' =>
                out.push(*byte as char),
            b' ' => out.push('+'),
            _ => out.push_str(&format!("%{:02X}", byte)),
        }
    }
    out
}
