import XCTest

final class CalculatorTests: XCTestCase {

    func testCalculationAddTwoNumbers() {
        let glue = CalculatorGlue()
        glue.examplesCalculationAddTwoNumbers([
            AdderString(fromArray: ["2", "3", "5"]),
            AdderString(fromArray: ["10", "20", "30"]),
            AdderString(fromArray: ["-1", "1", "0"]),
        ])
    }

}
