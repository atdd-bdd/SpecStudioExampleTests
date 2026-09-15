namespace SpecStudioExamplesTestsCSharp.AddressCorrection{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class AddressCorrection{

[TestMethod]
public void Test_Scenario_Standardize_an_address_that_is_already_complete(){
     AddressCorrection_glue addressCorrection_glue_object = new AddressCorrection_glue();

         List<List<string>> stringListList1 = new List<List<string>>{
            new List<string>{ "https://geocoding.geo.census.gov" },
         };
         addressCorrection_glue_object.Given_base_Page_is(stringListList1);

         List<RequestString> objectList2 = new List<RequestString>{
             new RequestString("GET","geocoder/locations/onelineaddress","1600 pennsylvania ave nw, washington, dc","Public_AR_Current","json"),
         };
         addressCorrection_glue_object.When_sending_request(objectList2);

         List<StatusString> objectList3 = new List<StatusString>{
             new StatusString("200"),
         };
         addressCorrection_glue_object.Then_response_status_is(objectList3);

         List<MatchString> objectList4 = new List<MatchString>{
             new MatchString("1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500",AddressComponentsString.FromText("20500 PENNSYLVANIA WASHINGTON \"\" NW DC AVE")),
         };
         addressCorrection_glue_object.Then_the_matched_addresses_are(objectList4);

}

[TestMethod]
public void Test_Scenario_Correct_a_spelled_out_ordinal(){
     AddressCorrection_glue addressCorrection_glue_object = new AddressCorrection_glue();

         List<List<string>> stringListList5 = new List<List<string>>{
            new List<string>{ "https://geocoding.geo.census.gov" },
         };
         addressCorrection_glue_object.Given_base_Page_is(stringListList5);

         List<RequestString> objectList6 = new List<RequestString>{
             new RequestString("GET","geocoder/locations/onelineaddress","350 fifth ave, new york, ny","Public_AR_Current","json"),
         };
         addressCorrection_glue_object.When_sending_request(objectList6);

         List<StatusString> objectList7 = new List<StatusString>{
             new StatusString("200"),
         };
         addressCorrection_glue_object.Then_response_status_is(objectList7);

         List<MatchString> objectList8 = new List<MatchString>{
             new MatchString("350 5TH AVE, NEW YORK, NY, 10118",new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")),
         };
         addressCorrection_glue_object.Then_the_matched_addresses_are(objectList8);

}

[TestMethod]
public void Test_Scenario_Return_every_candidate_for_an_ambiguous_address(){
     AddressCorrection_glue addressCorrection_glue_object = new AddressCorrection_glue();

         List<List<string>> stringListList9 = new List<List<string>>{
            new List<string>{ "https://geocoding.geo.census.gov" },
         };
         addressCorrection_glue_object.Given_base_Page_is(stringListList9);

         List<RequestString> objectList10 = new List<RequestString>{
             new RequestString("GET","geocoder/locations/onelineaddress","1600 pennsylvania ave, washington, dc","Public_AR_Current","json"),
         };
         addressCorrection_glue_object.When_sending_request(objectList10);

         List<StatusString> objectList11 = new List<StatusString>{
             new StatusString("200"),
         };
         addressCorrection_glue_object.Then_response_status_is(objectList11);

         List<MatchString> objectList12 = new List<MatchString>{
             new MatchString("1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003",new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")),
             new MatchString("1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500",new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")),
         };
         addressCorrection_glue_object.Then_the_matched_addresses_are(objectList12);

}

[TestMethod]
public void Test_Scenario_Report_an_address_that_cannot_be_corrected(){
     AddressCorrection_glue addressCorrection_glue_object = new AddressCorrection_glue();

         List<List<string>> stringListList13 = new List<List<string>>{
            new List<string>{ "https://geocoding.geo.census.gov" },
         };
         addressCorrection_glue_object.Given_base_Page_is(stringListList13);

         List<RequestString> objectList14 = new List<RequestString>{
             new RequestString("GET","geocoder/locations/onelineaddress","99999 nonexistent rd, nowhere, zz 00000","Public_AR_Current","json"),
         };
         addressCorrection_glue_object.When_sending_request(objectList14);

         List<StatusString> objectList15 = new List<StatusString>{
             new StatusString("200"),
         };
         addressCorrection_glue_object.Then_response_status_is(objectList15);

         addressCorrection_glue_object.Then_there_are_no_matched_addresses();

}

}
}
