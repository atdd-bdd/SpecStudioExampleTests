import XCTest

public class CalculatorGlue {
    public init() {}

    private let calc = Calculator()

    public func examplesCalculationAddTwoNumbers(_ values: [AdderString]) {
        for value in values {
            let typed = AdderTyped(from: value)
            XCTAssertEqual(typed.result, calc.add(typed.number1, typed.number2),
                           "Add \(typed.number1) + \(typed.number2)")
        }
    }
}
