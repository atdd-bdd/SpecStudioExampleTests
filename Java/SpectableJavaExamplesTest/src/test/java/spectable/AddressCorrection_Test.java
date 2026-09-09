package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.AddressCorrection_glue;
import production.*;
import records.*;
import calculator.*;
import org.junit.jupiter.api.Test;

public class AddressCorrection_Test {

    // -------------------------
    // Scenario Tests
    // -------------------------
    @Test
    public void Scenario_Standardize_an_address_that_is_already_complete() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList1 = new ArrayList<>();
        objectList1.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList1);

        List<RequestString> objectList2 = new ArrayList<>();
        objectList2.add(new RequestString("GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave nw, washington, dc", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList2);

        List<StatusString> objectList3 = new ArrayList<>();
        objectList3.add(new StatusString("200"));
        glue.Then_response_status_is(objectList3);

        List<MatchString> objectList4 = new ArrayList<>();
        objectList4.add(new MatchString(
                "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500",
                AddressComponentsString.fromText("20500 PENNSYLVANIA WASHINGTON \"\" NW DC AVE")));
        glue.Then_the_matched_addresses_are(objectList4);

    }

    @Test
    public void Scenario_Correct_a_spelled_out_ordinal() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList5 = new ArrayList<>();
        objectList5.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList5);

        List<RequestString> objectList6 = new ArrayList<>();
        objectList6.add(new RequestString("GET", "geocoder/locations/onelineaddress", "350 fifth ave, new york, ny", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList6);

        List<StatusString> objectList7 = new ArrayList<>();
        objectList7.add(new StatusString("200"));
        glue.Then_response_status_is(objectList7);

        List<MatchString> objectList8 = new ArrayList<>();
        objectList8.add(new MatchString(
                "350 5TH AVE, NEW YORK, NY, 10118",
                new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")));
        glue.Then_the_matched_addresses_are(objectList8);

    }

    @Test
    public void Scenario_Return_every_candidate_for_an_ambiguous_address() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList9 = new ArrayList<>();
        objectList9.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList9);

        List<RequestString> objectList10 = new ArrayList<>();
        objectList10.add(new RequestString("GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave, washington, dc", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList10);

        List<StatusString> objectList11 = new ArrayList<>();
        objectList11.add(new StatusString("200"));
        glue.Then_response_status_is(objectList11);

        List<MatchString> objectList12 = new ArrayList<>();
        objectList12.add(new MatchString(
                "1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003",
                new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")));
        objectList12.add(new MatchString(
                "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500",
                new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")));
        glue.Then_the_matched_addresses_are(objectList12);

    }

    @Test
    public void Scenario_Report_an_address_that_cannot_be_corrected() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList13 = new ArrayList<>();
        objectList13.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList13);

        List<RequestString> objectList14 = new ArrayList<>();
        objectList14.add(new RequestString("GET", "geocoder/locations/onelineaddress", "99999 nonexistent rd, nowhere, zz 00000", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList14);

        List<StatusString> objectList15 = new ArrayList<>();
        objectList15.add(new StatusString("200"));
        glue.Then_response_status_is(objectList15);

        glue.Then_there_are_no_matched_addresses();

    }

}
