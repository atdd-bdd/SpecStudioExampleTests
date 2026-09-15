import { AdderString, AddressComponentsString, CartInputString, DiscountInputString, FandCString, MatchString, RequestString, ShippingInputString, StatusString, ValidValuesString } from "./common/index.js";
import { AddressCorrectionGlue } from "./addressCorrection_glue.js";

describe("AddressCorrection", () => {

  test("Scenario Standardize an address that is already complete", () => {
    const glue = new AddressCorrectionGlue();
    const stringListList1 = [
      ["https://geocoding.geo.census.gov"],
    ];
    glue.givenBasePageIs(stringListList1);
    const objectList2 = [
      new RequestString("GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave nw, washington, dc", "Public_AR_Current", "json"),
    ];
    glue.whenSendingRequest(objectList2);
    const objectList3 = [
      new StatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList3);
    const objectList4 = [
      new MatchString("1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", AddressComponentsString.fromText("20500 PENNSYLVANIA WASHINGTON \"\" NW DC AVE")),
    ];
    glue.thenTheMatchedAddressesAre(objectList4);
  });

  test("Scenario Correct a spelled out ordinal", () => {
    const glue = new AddressCorrectionGlue();
    const stringListList5 = [
      ["https://geocoding.geo.census.gov"],
    ];
    glue.givenBasePageIs(stringListList5);
    const objectList6 = [
      new RequestString("GET", "geocoder/locations/onelineaddress", "350 fifth ave, new york, ny", "Public_AR_Current", "json"),
    ];
    glue.whenSendingRequest(objectList6);
    const objectList7 = [
      new StatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList7);
    const objectList8 = [
      new MatchString("350 5TH AVE, NEW YORK, NY, 10118", new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")),
    ];
    glue.thenTheMatchedAddressesAre(objectList8);
  });

  test("Scenario Return every candidate for an ambiguous address", () => {
    const glue = new AddressCorrectionGlue();
    const stringListList9 = [
      ["https://geocoding.geo.census.gov"],
    ];
    glue.givenBasePageIs(stringListList9);
    const objectList10 = [
      new RequestString("GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave, washington, dc", "Public_AR_Current", "json"),
    ];
    glue.whenSendingRequest(objectList10);
    const objectList11 = [
      new StatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList11);
    const objectList12 = [
      new MatchString("1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003", new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")),
      new MatchString("1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", new AddressComponentsString("?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?", "?DNC?")),
    ];
    glue.thenTheMatchedAddressesAre(objectList12);
  });

  test("Scenario Report an address that cannot be corrected", () => {
    const glue = new AddressCorrectionGlue();
    const stringListList13 = [
      ["https://geocoding.geo.census.gov"],
    ];
    glue.givenBasePageIs(stringListList13);
    const objectList14 = [
      new RequestString("GET", "geocoder/locations/onelineaddress", "99999 nonexistent rd, nowhere, zz 00000", "Public_AR_Current", "json"),
    ];
    glue.whenSendingRequest(objectList14);
    const objectList15 = [
      new StatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList15);
    glue.thenThereAreNoMatchedAddresses();
  });

});
