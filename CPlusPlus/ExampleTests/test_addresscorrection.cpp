#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "addresscorrection_glue.h"

TEST(AddressCorrection, Scenario_StandardizeAnAddressThatIsAlreadyComplete) {
    AddressCorrectionGlue glue;
    std::vector<std::vector<std::string>> stringListList1 = {
        {"https://geocoding.geo.census.gov"},
    };
    glue.given_base_page_is(stringListList1);

    std::vector<RequestString> objectList2 = {
        RequestString::from_vec({"GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave nw, washington, dc", "Public_AR_Current", "json"}),
    };
    glue.when_sending_request(objectList2);

    std::vector<StatusString> objectList3 = {
        StatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList3);

    std::vector<MatchString> objectList4 = {
        MatchString{"1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", AddressComponentsString{"20500", "PENNSYLVANIA", "WASHINGTON", "", "NW", "DC", "AVE"}},
    };
    glue.then_the_matched_addresses_are(objectList4);

}

TEST(AddressCorrection, Scenario_CorrectASpelledOutOrdinal) {
    AddressCorrectionGlue glue;
    std::vector<std::vector<std::string>> stringListList5 = {
        {"https://geocoding.geo.census.gov"},
    };
    glue.given_base_page_is(stringListList5);

    std::vector<RequestString> objectList6 = {
        RequestString::from_vec({"GET", "geocoder/locations/onelineaddress", "350 fifth ave, new york, ny", "Public_AR_Current", "json"}),
    };
    glue.when_sending_request(objectList6);

    std::vector<StatusString> objectList7 = {
        StatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList7);

    std::vector<MatchString> objectList8 = {
        MatchString{"350 5TH AVE, NEW YORK, NY, 10118", AddressComponentsString{"?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?"}},
    };
    glue.then_the_matched_addresses_are(objectList8);

}

TEST(AddressCorrection, Scenario_ReturnEveryCandidateForAnAmbiguousAddress) {
    AddressCorrectionGlue glue;
    std::vector<std::vector<std::string>> stringListList9 = {
        {"https://geocoding.geo.census.gov"},
    };
    glue.given_base_page_is(stringListList9);

    std::vector<RequestString> objectList10 = {
        RequestString::from_vec({"GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave, washington, dc", "Public_AR_Current", "json"}),
    };
    glue.when_sending_request(objectList10);

    std::vector<StatusString> objectList11 = {
        StatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList11);

    std::vector<MatchString> objectList12 = {
        MatchString{"1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003", AddressComponentsString{"?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?"}},
        MatchString{"1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", AddressComponentsString{"?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?"}},
    };
    glue.then_the_matched_addresses_are(objectList12);

}

TEST(AddressCorrection, Scenario_ReportAnAddressThatCannotBeCorrected) {
    AddressCorrectionGlue glue;
    std::vector<std::vector<std::string>> stringListList13 = {
        {"https://geocoding.geo.census.gov"},
    };
    glue.given_base_page_is(stringListList13);

    std::vector<RequestString> objectList14 = {
        RequestString::from_vec({"GET", "geocoder/locations/onelineaddress", "99999 nonexistent rd, nowhere, zz 00000", "Public_AR_Current", "json"}),
    };
    glue.when_sending_request(objectList14);

    std::vector<StatusString> objectList15 = {
        StatusString::from_vec({"200"}),
    };
    glue.then_response_status_is(objectList15);

    glue.then_there_are_no_matched_addresses();
}

