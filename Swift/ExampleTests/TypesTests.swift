import XCTest

final class TypesTests: XCTestCase {

    func testDataTypeDollar() {
        let glue = TypesGlue()
        glue.examplesDataTypeDollar([
            ValidValuesString(fromArray: ["0", "true", ""]),
            ValidValuesString(fromArray: ["0.01", "true", ""]),
            ValidValuesString(fromArray: ["-1", "false", "Negative not allowed"]),
            ValidValuesString(fromArray: ["0.001", "false", "Only 2 decimal digits"]),
        ])
    }

    func testDataTypeSimpleText() {
        let glue = TypesGlue()
        glue.examplesDataTypeSimpleText([
            ValidValuesString(fromArray: ["abc", "y", ""]),
            ValidValuesString(fromArray: ["ab.", "y", "period okay"]),
            ValidValuesString(fromArray: ["1234567890", "y", "digits"]),
            ValidValuesString(fromArray: ["@", "n", ""]),
            ValidValuesString(fromArray: ["-a-b", "y", "hyphens"]),
        ])
    }

}
