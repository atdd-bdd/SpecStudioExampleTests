import XCTest

public class RecordFilterExampleGlue {
    public init() {}

    private var recordFilter = RecordFilter()
    private var computedSum = 0

    public func givenListOfNumbers(_ values: [IDValueString]) {
        recordFilter = RecordFilter()
        for value in values {
            let typed = IDValueTyped(from: value)
            guard let id = try? IDForm(typed.iD) else {
                return XCTFail("bad ID \(typed.iD)")
            }
            recordFilter.add(IDValue(id: id, value: typed.value))
        }
    }

    public func whenFilteredByIdWithValue(_ values: [[String]]) {
        guard let first = values.first?.first else { return }
        guard let id = try? IDForm(first) else { return XCTFail("bad ID \(first)") }
        computedSum = recordFilter.sumByLabel(id)
    }

    public func thenSumIs(_ values: [[String]]) {
        guard let first = values.first?.first,
              let expected = Int(first.trimmingCharacters(in: .whitespaces)) else { return }
        XCTAssertEqual(expected, computedSum, "Sum")
    }

    public func whenFilteredBy(_ values: [FilterValueString]) {
        for value in values {
            let typed = FilterValueTyped(from: value)
            guard let id = try? IDForm(typed.value) else {
                return XCTFail("bad ID \(typed.value)")
            }
            computedSum = recordFilter.sumByLabel(id)
        }
    }

    public func thenResult(_ values: [ResultValueString]) {
        for value in values {
            let typed = ResultValueTyped(from: value)
            XCTAssertEqual(typed.sum, computedSum, "Filtered sum")
        }
    }

    public func whenElementAdded(_ values: [IDValueString]) {
        for value in values {
            let typed = IDValueTyped(from: value)
            guard let id = try? IDForm(typed.iD) else {
                return XCTFail("bad ID \(typed.iD)")
            }
            recordFilter.add(IDValue(id: id, value: typed.value))
        }
    }

    public func examplesCalculationConvertFToC(_ values: [FandCString]) {
        for value in values {
            let typed = FandCTyped(from: value)
            XCTAssertEqual(typed.c, fahrenheitToCelsius(typed.f),
                           "Convert \(typed.f)F to C")
        }
    }

    public func examplesDataTypeIDForm(_ values: [ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped(from: value)
            var failed = false
            do { _ = try IDForm(vvt.value) } catch { failed = true }
            XCTAssertEqual(vvt.isValid, !failed, " Value \(vvt.value)")
        }
    }
}
