import XCTest

final class AddressCorrectionTests: XCTestCase {

    func testStandardizeAnAddressThatIsAlreadyComplete() {
        let glue = AddressCorrectionGlue()
        glue.givenBasePageIs([
            ["https://geocoding.geo.census.gov"],
        ])
        glue.whenSendingRequest([
            RequestString(fromArray: ["GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave nw, washington, dc", "Public_AR_Current", "json"]),
        ])
        glue.thenResponseStatusIs([
            StatusString(fromArray: ["200"]),
        ])
        glue.thenTheMatchedAddressesAre([
            MatchString(matchedAddress: "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", addressComponents: AddressComponentsString(zip: "20500", streetName: "PENNSYLVANIA", city: "WASHINGTON", preDirection: "", suffixDirection: "NW", state: "DC", suffixType: "AVE")),
        ])
    }

    func testCorrectASpelledOutOrdinal() {
        let glue = AddressCorrectionGlue()
        glue.givenBasePageIs([
            ["https://geocoding.geo.census.gov"],
        ])
        glue.whenSendingRequest([
            RequestString(fromArray: ["GET", "geocoder/locations/onelineaddress", "350 fifth ave, new york, ny", "Public_AR_Current", "json"]),
        ])
        glue.thenResponseStatusIs([
            StatusString(fromArray: ["200"]),
        ])
        glue.thenTheMatchedAddressesAre([
            MatchString(matchedAddress: "350 5TH AVE, NEW YORK, NY, 10118", addressComponents: AddressComponentsString(zip: "?DNC?", streetName: "?DNC?", city: "?DNC?", preDirection: "?DNC?", suffixDirection: "?DNC?", state: "?DNC?", suffixType: "?DNC?")),
        ])
    }

    func testReturnEveryCandidateForAnAmbiguousAddress() {
        let glue = AddressCorrectionGlue()
        glue.givenBasePageIs([
            ["https://geocoding.geo.census.gov"],
        ])
        glue.whenSendingRequest([
            RequestString(fromArray: ["GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave, washington, dc", "Public_AR_Current", "json"]),
        ])
        glue.thenResponseStatusIs([
            StatusString(fromArray: ["200"]),
        ])
        glue.thenTheMatchedAddressesAre([
            MatchString(matchedAddress: "1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003", addressComponents: AddressComponentsString(zip: "?DNC?", streetName: "?DNC?", city: "?DNC?", preDirection: "?DNC?", suffixDirection: "?DNC?", state: "?DNC?", suffixType: "?DNC?")),
            MatchString(matchedAddress: "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", addressComponents: AddressComponentsString(zip: "?DNC?", streetName: "?DNC?", city: "?DNC?", preDirection: "?DNC?", suffixDirection: "?DNC?", state: "?DNC?", suffixType: "?DNC?")),
        ])
    }

    func testReportAnAddressThatCannotBeCorrected() {
        let glue = AddressCorrectionGlue()
        glue.givenBasePageIs([
            ["https://geocoding.geo.census.gov"],
        ])
        glue.whenSendingRequest([
            RequestString(fromArray: ["GET", "geocoder/locations/onelineaddress", "99999 nonexistent rd, nowhere, zz 00000", "Public_AR_Current", "json"]),
        ])
        glue.thenResponseStatusIs([
            StatusString(fromArray: ["200"]),
        ])
        glue.thenThereAreNoMatchedAddresses()
    }

}
