#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "api_glue.h"

TEST(API, Scenario_RetrieveASinglePost) {
    APIGlue glue;
    std::vector<std::vector<std::string>> stringListList1 = {
        {"https://jsonplaceholder.typicode.com"},
    };
    glue.given_base_page_is(stringListList1);

    std::vector<ApiRequestString> objectList2 = {
        ApiRequestString::from_vec({"GET", "posts", "1", ""}),
    };
    glue.when_sending_request(objectList2);

    std::vector<ApiStatusString> objectList3 = {
        ApiStatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList3);

    std::vector<PostString> objectList4 = {
        PostString::from_vec({"1", "1", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"}),
    };
    glue.then_response_body_is(objectList4);

}

TEST(API, Scenario_RetrieveAllPosts) {
    APIGlue glue;
    std::vector<std::vector<std::string>> stringListList5 = {
        {"https://jsonplaceholder.typicode.com"},
    };
    glue.given_base_page_is(stringListList5);

    std::vector<ApiRequestString> objectList6 = {
        ApiRequestString::from_vec({"GET", "posts", "", ""}),
    };
    glue.when_sending_request(objectList6);

    std::vector<ApiStatusString> objectList7 = {
        ApiStatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList7);

    std::vector<std::vector<std::string>> stringListList8 = {
        {"100"},
    };
    glue.then_response_array_contains_this_many_items(stringListList8);

}

TEST(API, Scenario_CreateANewPost) {
    APIGlue glue;
    std::vector<std::vector<std::string>> stringListList9 = {
        {"https://jsonplaceholder.typicode.com"},
    };
    glue.given_base_page_is(stringListList9);

    std::vector<NewPostString> objectList10 = {
        NewPostString::from_vec({"AlignThree Demo", "Testing POST", "7"}),
    };
    glue.given_new_post_data(objectList10);

    std::vector<ApiRequestString> objectList11 = {
        ApiRequestString::from_vec({"POST", "posts", "", "NewPost"}),
    };
    glue.when_sending_request(objectList11);

    std::vector<ApiStatusString> objectList12 = {
        ApiStatusString::from_vec({"201"}),
    };
    glue.then_response_status_is(objectList12);

    std::vector<PostString> objectList13 = {
        PostString::from_vec({"7", "101", "AlignThree Demo", "Testing POST"}),
    };
    glue.then_response_body_is(objectList13);

}

TEST(API, Scenario_ReplaceAnExistingPost) {
    APIGlue glue;
    std::vector<std::vector<std::string>> stringListList14 = {
        {"https://jsonplaceholder.typicode.com"},
    };
    glue.given_base_page_is(stringListList14);

    std::vector<ReplacePostString> objectList15 = {
        ReplacePostString::from_vec({"1", "1", "Replaced Title", "Replaced Body"}),
    };
    glue.given_replacement_data(objectList15);

    std::vector<ApiRequestString> objectList16 = {
        ApiRequestString::from_vec({"PUT", "posts", "1", "ReplacePost"}),
    };
    glue.when_sending_request(objectList16);

    std::vector<ApiStatusString> objectList17 = {
        ApiStatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList17);

    std::vector<PostString> objectList18 = {
        PostString::from_vec({"1", "1", "Replaced Title", "Replaced Body"}),
    };
    glue.then_response_body_is(objectList18);

}

TEST(API, Scenario_UpdateAPostTitle) {
    APIGlue glue;
    std::vector<std::vector<std::string>> stringListList19 = {
        {"https://jsonplaceholder.typicode.com"},
    };
    glue.given_base_page_is(stringListList19);

    std::vector<PatchTitleString> objectList20 = {
        PatchTitleString::from_vec({"Patched Title"}),
    };
    glue.given_patch_data(objectList20);

    std::vector<ApiRequestString> objectList21 = {
        ApiRequestString::from_vec({"PATCH", "posts", "1", "PatchTitle"}),
    };
    glue.when_sending_request(objectList21);

    std::vector<ApiStatusString> objectList22 = {
        ApiStatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList22);

    std::vector<PostString> objectList23 = {
        PostString::from_vec({"1", "1", "Patched Title", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"}),
    };
    glue.then_response_body_is(objectList23);

}

TEST(API, Scenario_DeleteAPost) {
    APIGlue glue;
    std::vector<std::vector<std::string>> stringListList24 = {
        {"https://jsonplaceholder.typicode.com"},
    };
    glue.given_base_page_is(stringListList24);

    std::vector<ApiRequestString> objectList25 = {
        ApiRequestString::from_vec({"DELETE", "posts", "1", ""}),
    };
    glue.when_sending_request(objectList25);

    std::vector<ApiStatusString> objectList26 = {
        ApiStatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList26);

}

