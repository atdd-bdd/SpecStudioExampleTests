#![allow(dead_code, unused_variables, unused_imports)]

use std::collections::HashMap;

use crate::common::*;
use crate::rest_call::RestCall;

const DNC_STRING: &str = "?DNC?";

/// Exercises a live REST API over HTTP.
///
/// There are no production classes behind this one: the API itself is the thing
/// under test. RestCall does the transport, so what is left here is only the
/// three things glue should do -- turn a table into JSON with the generated
/// to_json(), turn the response JSON back into a table with the generated
/// from_json_value(), and compare.
///
/// The status and the body are separate steps because they come from separate
/// places. Keeping them apart is what lets the body go straight through the
/// generated reader: while a status was mixed into the body's attribute set, the
/// reader demanded a "status" field no API response ever contains.
pub struct APIGlue {
    base_page: String,

    /// Bodies offered by Given steps, keyed by the attribute set that carried them.
    bodies: HashMap<String, String>,

    call: Option<RestCall>,
}

impl APIGlue {
    pub fn new() -> Self {
        Self { base_page: String::new(), bodies: HashMap::new(), call: None }
    }

    // ---- given -------------------------------------------------------------

    pub fn given_base_page_is(&mut self, values: &[Vec<String>]) {
        for row in values {
            for cell in row {
                if !cell.trim().is_empty() {
                    self.base_page = cell.trim().to_string();
                }
            }
        }
        assert!(!self.base_page.is_empty(), "no base Page given");
    }

    pub fn given_new_post_data(&mut self, values: &[NewPostString]) {
        for value in values {
            self.bodies.insert("NewPost".to_string(),
                               NewPostTyped::from_str_struct(value).to_json());
        }
    }

    pub fn given_replacement_data(&mut self, values: &[ReplacePostString]) {
        for value in values {
            self.bodies.insert("ReplacePost".to_string(),
                               ReplacePostTyped::from_str_struct(value).to_json());
        }
    }

    pub fn given_patch_data(&mut self, values: &[PatchTitleString]) {
        for value in values {
            self.bodies.insert("PatchTitle".to_string(),
                               PatchTitleTyped::from_str_struct(value).to_json());
        }
    }

    // ---- when --------------------------------------------------------------

    pub fn when_sending_request(&mut self, values: &[ApiRequestString]) {
        for value in values {
            let request = ApiRequestTyped::from_str_struct(value);

            // Body names an attribute set a Given step already turned into JSON.
            let body_name = request.body.trim().to_string();
            let payload = if body_name.is_empty() {
                String::new()
            } else {
                self.bodies
                    .get(&body_name)
                    .unwrap_or_else(|| panic!("no Given step supplied a body named {}", body_name))
                    .clone()
            };

            match RestCall::send(&request.method, &self.base_page,
                                 &request.page, &request.parameter, &payload) {
                Ok(call) => self.call = Some(call),
                Err(message) => panic!("{}", message),
            }
        }
    }

    // ---- then --------------------------------------------------------------

    pub fn then_response_status_is(&mut self, values: &[ApiStatusString]) {
        let call = self.call.as_ref().expect("no request was sent");

        for expected in values {
            // Code is declared Integer, so it arrives as i32; RestCall carries
            // the HTTP status as the u16 it actually is.
            let want = ApiStatusTyped::from_str_struct(expected).code;
            assert_eq!(want, i32::from(call.status), "HTTP status from {}", call.url);
        }
    }

    pub fn then_response_body_is(&mut self, values: &[PostString]) {
        let call = self.call.as_ref().expect("no request was sent");

        let actual = PostTyped::from_json(&call.body).expect("a Post");

        for expected in values {
            compare_post("", expected, &actual);
        }
    }

    pub fn then_response_array_contains_this_many_items(&mut self, values: &[Vec<String>]) {
        let call = self.call.as_ref().expect("no request was sent");

        let expected: usize = values[0][0].trim().parse().expect("a count");
        let items = PostTyped::from_json_list(&call.body).expect("an array of Post");

        assert_eq!(items.len(), expected,
                   "number of items returned by {}", call.url);
    }
}

/// One expected row against one returned post.
///
/// A table that states every column is compared typed, so that the values are
/// checked as the types the specification declares and not merely as matching
/// text. A CompareOnly table cannot be: its unstated columns hold ?DNC?, which
/// has no typed meaning, and only the String struct knows to skip it. So that
/// case compares the string form of both sides instead.
fn compare_post(where_: &str, expected: &PostString, actual: &PostTyped) {
    if states_every_column(expected) {
        let want = PostTyped::from_str_struct(expected);
        assert_eq!(&want, actual, "{}post", where_);
    } else {
        let got = actual.to_str_struct();
        assert_eq!(expected, &got, "{}post", where_);
    }
}

/// False when any column was left to CompareOnly, and so holds ?DNC?.
fn states_every_column(row: &PostString) -> bool {
    row.userid != DNC_STRING
        && row.id != DNC_STRING
        && row.title != DNC_STRING
        && row.body != DNC_STRING
}
