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

        List<ResultString> objectList4 = new ArrayList<>();
        objectList4.add(new ResultString("1"));
        glue.Then_match_count_is(objectList4);

        List<MatchString> objectList5 = new ArrayList<>();
        objectList5.add(new MatchString("1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", "", "PENNSYLVANIA", "AVE", "NW", "WASHINGTON", "DC", "20500"));
        glue.Then_the_matched_address_is(objectList5);

    }

    @Test
    public void Scenario_Correct_a_spelled_out_ordinal() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList6 = new ArrayList<>();
        objectList6.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList6);

        List<RequestString> objectList7 = new ArrayList<>();
        objectList7.add(new RequestString("GET", "geocoder/locations/onelineaddress", "350 fifth ave, new york, ny", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList7);

        List<StatusString> objectList8 = new ArrayList<>();
        objectList8.add(new StatusString("200"));
        glue.Then_response_status_is(objectList8);

        List<ResultString> objectList9 = new ArrayList<>();
        objectList9.add(new ResultString("1"));
        glue.Then_match_count_is(objectList9);

        List<MatchString> objectList10 = new ArrayList<>();
        objectList10.add(new MatchString("350 5TH AVE, NEW YORK, NY, 10118", "?DNC?", "5TH", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "10118"));
        glue.Then_the_matched_address_is(objectList10);

    }

    @Test
    public void Scenario_Keep_a_directional_the_caller_supplied() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList11 = new ArrayList<>();
        objectList11.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList11);

        List<RequestString> objectList12 = new ArrayList<>();
        objectList12.add(new RequestString("GET", "geocoder/locations/onelineaddress", "200 e main st, columbus, oh", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList12);

        List<StatusString> objectList13 = new ArrayList<>();
        objectList13.add(new StatusString("200"));
        glue.Then_response_status_is(objectList13);

        List<MatchString> objectList14 = new ArrayList<>();
        objectList14.add(new MatchString("200 E MAIN ST, COLUMBUS, OH, 43215", "E", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?"));
        glue.Then_the_matched_address_is(objectList14);

    }

    @Test
    public void Scenario_Return_every_candidate_for_an_ambiguous_address() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList15 = new ArrayList<>();
        objectList15.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList15);

        List<RequestString> objectList16 = new ArrayList<>();
        objectList16.add(new RequestString("GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave, washington, dc", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList16);

        List<StatusString> objectList17 = new ArrayList<>();
        objectList17.add(new StatusString("200"));
        glue.Then_response_status_is(objectList17);

        List<ResultString> objectList18 = new ArrayList<>();
        objectList18.add(new ResultString("2"));
        glue.Then_match_count_is(objectList18);

        List<MatchString> objectList19 = new ArrayList<>();
        objectList19.add(new MatchString("1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?"));
        objectList19.add(new MatchString("1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?"));
        glue.Then_the_matched_addresses_are(objectList19);

    }

    @Test
    public void Scenario_Report_an_address_that_cannot_be_corrected() {
        AddressCorrection_glue glue = new AddressCorrection_glue();

        List<List<String>> objectList20 = new ArrayList<>();
        objectList20.add(List.of("https://geocoding.geo.census.gov"));
        glue.Given_base_Page_is(objectList20);

        List<RequestString> objectList21 = new ArrayList<>();
        objectList21.add(new RequestString("GET", "geocoder/locations/onelineaddress", "99999 nonexistent rd, nowhere, zz 00000", "Public_AR_Current", "json"));
        glue.When_sending_request(objectList21);

        List<StatusString> objectList22 = new ArrayList<>();
        objectList22.add(new StatusString("200"));
        glue.Then_response_status_is(objectList22);

        List<ResultString> objectList23 = new ArrayList<>();
        objectList23.add(new ResultString("0"));
        glue.Then_match_count_is(objectList23);

    }

}
