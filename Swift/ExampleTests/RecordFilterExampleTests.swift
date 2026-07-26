import XCTest

final class RecordFilterExampleTests: XCTestCase {

    func testFilterDataByID() {
        let glue = RecordFilterExampleGlue()
        glue.givenListOfNumbers([
            IDValueString(fromArray: ["Q1234", "1"]),
            IDValueString(fromArray: ["Q9999", "2"]),
            IDValueString(fromArray: ["Q1234", "3"]),
        ])
        glue.whenFilteredByIdWithValue([
            ["Q1234"],
        ])
        glue.thenSumIs([
            ["4"],
        ])
    }

    func testFilterDataAnotherWay() {
        let glue = RecordFilterExampleGlue()
        glue.givenListOfNumbers([
            IDValueString(fromArray: ["Q1234", "1"]),
            IDValueString(fromArray: ["Q9999", "2"]),
            IDValueString(fromArray: ["Q1234", "3"]),
        ])
        glue.whenFilteredBy([
            FilterValueString(fromArray: ["Q1234"]),
        ])
        glue.thenResult([
            ResultValueString(fromArray: ["4"]),
        ])
    }

    func testAddAnotherValue() {
        let glue = RecordFilterExampleGlue()
        glue.givenListOfNumbers([
            IDValueString(fromArray: ["Q1234", "1"]),
            IDValueString(fromArray: ["Q9999", "2"]),
            IDValueString(fromArray: ["Q1234", "3"]),
        ])
        glue.whenElementAdded([
            IDValueString(fromArray: ["Q1234", "4"]),
        ])
        glue.whenFilteredBy([
            FilterValueString(fromArray: ["Q1234"]),
        ])
        glue.thenResult([
            ResultValueString(fromArray: ["8"]),
        ])
    }

    func testCalculationConvertFToC() {
        let glue = RecordFilterExampleGlue()
        glue.examplesCalculationConvertFToC([
            FandCString(fromArray: ["32", "0", "Freezing"]),
            FandCString(fromArray: ["212", "100", "Boiling"]),
            FandCString(fromArray: ["-40", "-40", "Below zero"]),
            FandCString(fromArray: ["68", "20", "Photo chem"]),
        ])
    }

    func testDataTypeIDForm() {
        let glue = RecordFilterExampleGlue()
        glue.examplesDataTypeIDForm([
            ValidValuesString(fromArray: ["Q1234", "true", ""]),
            ValidValuesString(fromArray: ["Q123", "false", "Too short"]),
            ValidValuesString(fromArray: ["Q12345", "false", "Too long"]),
            ValidValuesString(fromArray: ["A1234", "false", "Must begin with Q"]),
        ])
    }

}
