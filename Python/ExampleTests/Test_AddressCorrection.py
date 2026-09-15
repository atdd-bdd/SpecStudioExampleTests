import pytest
from common import *
from address_correction_glue import AddressCorrectionGlue

def test_Scenario_StandardizeAnAddressThatIsAlreadyComplete():
    glue = AddressCorrectionGlue()

    string_list_list_1 = [
        ['https://geocoding.geo.census.gov'],
    ]
    glue.given_base_page_is(string_list_list_1)

    object_list_2 = [
        RequestString('GET', 'geocoder/locations/onelineaddress', '1600 pennsylvania ave nw, washington, dc', 'Public_AR_Current', 'json'),
    ]
    glue.when_sending_request(object_list_2)

    object_list_3 = [
        StatusString('200'),
    ]
    glue.then_response_status_is(object_list_3)

    object_list_4 = [
        MatchString('1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500', AddressComponentsString.from_text('20500 PENNSYLVANIA WASHINGTON "" NW DC AVE')),
    ]
    glue.then_the_matched_addresses_are(object_list_4)


def test_Scenario_CorrectASpelledOutOrdinal():
    glue = AddressCorrectionGlue()

    string_list_list_5 = [
        ['https://geocoding.geo.census.gov'],
    ]
    glue.given_base_page_is(string_list_list_5)

    object_list_6 = [
        RequestString('GET', 'geocoder/locations/onelineaddress', '350 fifth ave, new york, ny', 'Public_AR_Current', 'json'),
    ]
    glue.when_sending_request(object_list_6)

    object_list_7 = [
        StatusString('200'),
    ]
    glue.then_response_status_is(object_list_7)

    object_list_8 = [
        MatchString('350 5TH AVE, NEW YORK, NY, 10118', AddressComponentsString('?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?')),
    ]
    glue.then_the_matched_addresses_are(object_list_8)


def test_Scenario_ReturnEveryCandidateForAnAmbiguousAddress():
    glue = AddressCorrectionGlue()

    string_list_list_9 = [
        ['https://geocoding.geo.census.gov'],
    ]
    glue.given_base_page_is(string_list_list_9)

    object_list_10 = [
        RequestString('GET', 'geocoder/locations/onelineaddress', '1600 pennsylvania ave, washington, dc', 'Public_AR_Current', 'json'),
    ]
    glue.when_sending_request(object_list_10)

    object_list_11 = [
        StatusString('200'),
    ]
    glue.then_response_status_is(object_list_11)

    object_list_12 = [
        MatchString('1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003', AddressComponentsString('?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?')),
        MatchString('1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500', AddressComponentsString('?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?', '?DNC?')),
    ]
    glue.then_the_matched_addresses_are(object_list_12)


def test_Scenario_ReportAnAddressThatCannotBeCorrected():
    glue = AddressCorrectionGlue()

    string_list_list_13 = [
        ['https://geocoding.geo.census.gov'],
    ]
    glue.given_base_page_is(string_list_list_13)

    object_list_14 = [
        RequestString('GET', 'geocoder/locations/onelineaddress', '99999 nonexistent rd, nowhere, zz 00000', 'Public_AR_Current', 'json'),
    ]
    glue.when_sending_request(object_list_14)

    object_list_15 = [
        StatusString('200'),
    ]
    glue.then_response_status_is(object_list_15)

    glue.then_there_are_no_matched_addresses()


