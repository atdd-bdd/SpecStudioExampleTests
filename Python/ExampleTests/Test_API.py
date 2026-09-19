import pytest
from common import *
from api_glue import APIGlue

def test_Scenario_RetrieveASinglePost():
    glue = APIGlue()

    string_list_list_1 = [
        ['https://jsonplaceholder.typicode.com'],
    ]
    glue.given_base_page_is(string_list_list_1)

    object_list_2 = [
        ApiRequestString('GET', 'posts', '1', ''),
    ]
    glue.when_sending_request(object_list_2)

    object_list_3 = [
        ApiStatusString('200'),
    ]
    glue.then_response_status_is(object_list_3)

    object_list_4 = [
        PostString('1', '1', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'),
    ]
    glue.then_response_body_is(object_list_4)


def test_Scenario_RetrieveAllPosts():
    glue = APIGlue()

    string_list_list_5 = [
        ['https://jsonplaceholder.typicode.com'],
    ]
    glue.given_base_page_is(string_list_list_5)

    object_list_6 = [
        ApiRequestString('GET', 'posts', '', ''),
    ]
    glue.when_sending_request(object_list_6)

    object_list_7 = [
        ApiStatusString('200'),
    ]
    glue.then_response_status_is(object_list_7)

    string_list_list_8 = [
        ['100'],
    ]
    glue.then_response_array_contains_this_many_items(string_list_list_8)


def test_Scenario_CreateANewPost():
    glue = APIGlue()

    string_list_list_9 = [
        ['https://jsonplaceholder.typicode.com'],
    ]
    glue.given_base_page_is(string_list_list_9)

    object_list_10 = [
        NewPostString('AlignThree Demo', 'Testing POST', '7'),
    ]
    glue.given_new_post_data(object_list_10)

    object_list_11 = [
        ApiRequestString('POST', 'posts', '', 'NewPost'),
    ]
    glue.when_sending_request(object_list_11)

    object_list_12 = [
        ApiStatusString('201'),
    ]
    glue.then_response_status_is(object_list_12)

    object_list_13 = [
        PostString('7', '101', 'AlignThree Demo', 'Testing POST'),
    ]
    glue.then_response_body_is(object_list_13)


def test_Scenario_ReplaceAnExistingPost():
    glue = APIGlue()

    string_list_list_14 = [
        ['https://jsonplaceholder.typicode.com'],
    ]
    glue.given_base_page_is(string_list_list_14)

    object_list_15 = [
        ReplacePostString('1', '1', 'Replaced Title', 'Replaced Body'),
    ]
    glue.given_replacement_data(object_list_15)

    object_list_16 = [
        ApiRequestString('PUT', 'posts', '1', 'ReplacePost'),
    ]
    glue.when_sending_request(object_list_16)

    object_list_17 = [
        ApiStatusString('200'),
    ]
    glue.then_response_status_is(object_list_17)

    object_list_18 = [
        PostString('1', '1', 'Replaced Title', 'Replaced Body'),
    ]
    glue.then_response_body_is(object_list_18)


def test_Scenario_UpdateAPostTitle():
    glue = APIGlue()

    string_list_list_19 = [
        ['https://jsonplaceholder.typicode.com'],
    ]
    glue.given_base_page_is(string_list_list_19)

    object_list_20 = [
        PatchTitleString('Patched Title'),
    ]
    glue.given_patch_data(object_list_20)

    object_list_21 = [
        ApiRequestString('PATCH', 'posts', '1', 'PatchTitle'),
    ]
    glue.when_sending_request(object_list_21)

    object_list_22 = [
        ApiStatusString('200'),
    ]
    glue.then_response_status_is(object_list_22)

    object_list_23 = [
        PostString('1', '1', 'Patched Title', 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'),
    ]
    glue.then_response_body_is(object_list_23)


def test_Scenario_DeleteAPost():
    glue = APIGlue()

    string_list_list_24 = [
        ['https://jsonplaceholder.typicode.com'],
    ]
    glue.given_base_page_is(string_list_list_24)

    object_list_25 = [
        ApiRequestString('DELETE', 'posts', '1', ''),
    ]
    glue.when_sending_request(object_list_25)

    object_list_26 = [
        ApiStatusString('200'),
    ]
    glue.then_response_status_is(object_list_26)


