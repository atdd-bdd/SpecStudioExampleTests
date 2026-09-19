#![allow(unused_mut, unused_variables, unused_imports)]

use crate::common::*;
use super::api_glue::APIGlue;

// --- Scenario Tests ---

#[test]
fn scenario_retrieve_a_single_post() {
    let mut glue = APIGlue::new();
    glue.given_base_page_is(&[
        vec!["https://jsonplaceholder.typicode.com".to_string()],
    ]);
    glue.when_sending_request(&[ApiRequestString::from_vec(&["GET", "posts", "1", ""])]);
    glue.then_response_status_is(&[ApiStatusString::from_vec(&["200"])]);
    glue.then_response_body_is(&[PostString::from_vec(&["1", "1", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"])]);
}

#[test]
fn scenario_retrieve_all_posts() {
    let mut glue = APIGlue::new();
    glue.given_base_page_is(&[
        vec!["https://jsonplaceholder.typicode.com".to_string()],
    ]);
    glue.when_sending_request(&[ApiRequestString::from_vec(&["GET", "posts", "", ""])]);
    glue.then_response_status_is(&[ApiStatusString::from_vec(&["200"])]);
    glue.then_response_array_contains_this_many_items(&[
        vec!["100".to_string()],
    ]);
}

#[test]
fn scenario_create_a_new_post() {
    let mut glue = APIGlue::new();
    glue.given_base_page_is(&[
        vec!["https://jsonplaceholder.typicode.com".to_string()],
    ]);
    glue.given_new_post_data(&[NewPostString::from_vec(&["AlignThree Demo", "Testing POST", "7"])]);
    glue.when_sending_request(&[ApiRequestString::from_vec(&["POST", "posts", "", "NewPost"])]);
    glue.then_response_status_is(&[ApiStatusString::from_vec(&["201"])]);
    glue.then_response_body_is(&[PostString::from_vec(&["7", "101", "AlignThree Demo", "Testing POST"])]);
}

#[test]
fn scenario_replace_an_existing_post() {
    let mut glue = APIGlue::new();
    glue.given_base_page_is(&[
        vec!["https://jsonplaceholder.typicode.com".to_string()],
    ]);
    glue.given_replacement_data(&[ReplacePostString::from_vec(&["1", "1", "Replaced Title", "Replaced Body"])]);
    glue.when_sending_request(&[ApiRequestString::from_vec(&["PUT", "posts", "1", "ReplacePost"])]);
    glue.then_response_status_is(&[ApiStatusString::from_vec(&["200"])]);
    glue.then_response_body_is(&[PostString::from_vec(&["1", "1", "Replaced Title", "Replaced Body"])]);
}

#[test]
fn scenario_update_a_post_title() {
    let mut glue = APIGlue::new();
    glue.given_base_page_is(&[
        vec!["https://jsonplaceholder.typicode.com".to_string()],
    ]);
    glue.given_patch_data(&[PatchTitleString::from_vec(&["Patched Title"])]);
    glue.when_sending_request(&[ApiRequestString::from_vec(&["PATCH", "posts", "1", "PatchTitle"])]);
    glue.then_response_status_is(&[ApiStatusString::from_vec(&["200"])]);
    glue.then_response_body_is(&[PostString::from_vec(&["1", "1", "Patched Title", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"])]);
}

#[test]
fn scenario_delete_a_post() {
    let mut glue = APIGlue::new();
    glue.given_base_page_is(&[
        vec!["https://jsonplaceholder.typicode.com".to_string()],
    ]);
    glue.when_sending_request(&[ApiRequestString::from_vec(&["DELETE", "posts", "1", ""])]);
    glue.then_response_status_is(&[ApiStatusString::from_vec(&["200"])]);
}

