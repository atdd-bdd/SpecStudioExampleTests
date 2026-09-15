#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use super::addresscorrection_glue::AddressCorrectionGlue;

// --- Scenario Tests ---

#[test]
fn scenario_standardize_an_address_that_is_already_complete() {
    let mut glue = AddressCorrectionGlue::new();
    glue.given_base_page_is(&[
        vec!["https://geocoding.geo.census.gov".to_string()],
    ]);
    glue.when_sending_request(&[RequestString::from_vec(&["GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave nw, washington, dc", "Public_AR_Current", "json"])]);
    glue.then_response_status_is(&[StatusString::from_vec(&["200"])]);
    glue.then_the_matched_addresses_are(&[MatchString { matchedaddress: "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500".to_string(), addresscomponents: AddressComponentsString { zip: "20500".to_string(), streetname: "PENNSYLVANIA".to_string(), city: "WASHINGTON".to_string(), predirection: "".to_string(), suffixdirection: "NW".to_string(), state: "DC".to_string(), suffixtype: "AVE".to_string() } }]);
}

#[test]
fn scenario_correct_a_spelled_out_ordinal() {
    let mut glue = AddressCorrectionGlue::new();
    glue.given_base_page_is(&[
        vec!["https://geocoding.geo.census.gov".to_string()],
    ]);
    glue.when_sending_request(&[RequestString::from_vec(&["GET", "geocoder/locations/onelineaddress", "350 fifth ave, new york, ny", "Public_AR_Current", "json"])]);
    glue.then_response_status_is(&[StatusString::from_vec(&["200"])]);
    glue.then_the_matched_addresses_are(&[MatchString { matchedaddress: "350 5TH AVE, NEW YORK, NY, 10118".to_string(), addresscomponents: AddressComponentsString { zip: "?DNC?".to_string(), streetname: "?DNC?".to_string(), city: "?DNC?".to_string(), predirection: "?DNC?".to_string(), suffixdirection: "?DNC?".to_string(), state: "?DNC?".to_string(), suffixtype: "?DNC?".to_string() } }]);
}

#[test]
fn scenario_return_every_candidate_for_an_ambiguous_address() {
    let mut glue = AddressCorrectionGlue::new();
    glue.given_base_page_is(&[
        vec!["https://geocoding.geo.census.gov".to_string()],
    ]);
    glue.when_sending_request(&[RequestString::from_vec(&["GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave, washington, dc", "Public_AR_Current", "json"])]);
    glue.then_response_status_is(&[StatusString::from_vec(&["200"])]);
    glue.then_the_matched_addresses_are(&[
        MatchString { matchedaddress: "1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003".to_string(), addresscomponents: AddressComponentsString { zip: "?DNC?".to_string(), streetname: "?DNC?".to_string(), city: "?DNC?".to_string(), predirection: "?DNC?".to_string(), suffixdirection: "?DNC?".to_string(), state: "?DNC?".to_string(), suffixtype: "?DNC?".to_string() } },
        MatchString { matchedaddress: "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500".to_string(), addresscomponents: AddressComponentsString { zip: "?DNC?".to_string(), streetname: "?DNC?".to_string(), city: "?DNC?".to_string(), predirection: "?DNC?".to_string(), suffixdirection: "?DNC?".to_string(), state: "?DNC?".to_string(), suffixtype: "?DNC?".to_string() } },
    ]);
}

#[test]
fn scenario_report_an_address_that_cannot_be_corrected() {
    let mut glue = AddressCorrectionGlue::new();
    glue.given_base_page_is(&[
        vec!["https://geocoding.geo.census.gov".to_string()],
    ]);
    glue.when_sending_request(&[RequestString::from_vec(&["GET", "geocoder/locations/onelineaddress", "99999 nonexistent rd, nowhere, zz 00000", "Public_AR_Current", "json"])]);
    glue.then_response_status_is(&[StatusString::from_vec(&["200"])]);
    glue.then_there_are_no_matched_addresses();
}

