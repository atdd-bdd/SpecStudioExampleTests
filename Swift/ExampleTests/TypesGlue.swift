import XCTest

public class TypesGlue {
    public init() {}

    public func examplesDataTypeDollar(_ values: [ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped(from: value)
            var failed = false
            do { _ = try Dollar(vvt.value) } catch { failed = true }
            XCTAssertEqual(vvt.isValid, !failed, " Value \(vvt.value)")
        }
    }

    public func examplesDataTypeSimpleText(_ values: [ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped(from: value)
            var failed = false
            do { _ = try SimpleText(vvt.value) } catch { failed = true }
            XCTAssertEqual(vvt.isValid, !failed, " Value \(vvt.value)")
        }
    }
}
