import Foundation
import XCTest

/// Drives BowlingGame from the specification's steps.
///
/// There is no scoring here on purpose: every rule about strikes, spares, marks
/// and totals lives in the production classes, and this file only hands rolls in
/// and compares what comes back.
public class BowlingGlue {
    private static let dncString = "?DNC?"

    private let game = BowlingGame()

    public init() {}

    // ---- given --------------------------------------------------------------

    public func givenRollsAre(_ values: [[String]]) {
        game.setRolls(pinCounts(values))
    }

    public func givenRollsForTenthFrameAre(_ values: [[String]]) {
        game.setTenthFrameRolls(pinCounts(values))
    }

    /// The frame values from the previous step are still on the same game.
    public func givenFrameValuesAreAsPrevious() {
        XCTAssertFalse(game.frames().isEmpty, "no game to carry forward")
    }

    // ---- when ---------------------------------------------------------------

    public func whenRollIs(_ values: [[String]]) {
        for pinCount in pinCounts(values) {
            game.addRoll(pinCount)
        }
    }

    public func whenScored() {
        game.score()
    }

    // ---- then ---------------------------------------------------------------

    public func thenRollsBecome(_ values: [[String]]) {
        let expected = pinCounts(values)
        let actual = game.allRolls()

        XCTAssertEqual(expected.count, actual.count, "number of rolls \(actual)")
        for (i, want) in expected.enumerated() where i < actual.count {
            XCTAssertEqual(want, actual[i], "roll \(i + 1)")
        }
    }

    public func thenDisplayIs(_ value: String) {
        XCTAssertEqual(game.display(), value, "display")
    }

    public func thenFrameValuesAre(_ values: [FrameValuesString]) {
        for expected in values { assertFrameEquals(expected) }
    }

    /// The step reads "Then Then tenth frame values are" in the specification,
    /// and the generated method name follows it. Renaming the method would only
    /// make it disagree with the generated test.
    public func thenThenTenthFrameValuesAre(_ values: [FrameValuesString]) {
        for expected in values { assertFrameEquals(expected) }
    }

    public func thenDisplayValuesAre(_ values: [FrameDisplayString]) {
        let actual = game.marks()

        for expected in values {
            guard let frame = actual.first(where: { $0.frame == expected.frame.trimmed }) else {
                XCTFail("no frame numbered \(expected.frame)")
                continue
            }
            let where_ = "frame \(expected.frame) "
            assertField(where_ + "Mark1", expected.mark1, frame.mark1)
            assertField(where_ + "Mark2", expected.mark2, frame.mark2)
            assertField(where_ + "Mark3", expected.mark3, frame.mark3)
            assertField(where_ + "TotalScore", expected.totalScore, frame.totalScore)
        }
    }

    public func thenGameCompleteIs(_ values: [[String]]) {
        for row in values {
            for expected in row {
                XCTAssertEqual(expected.trimmed, String(game.isComplete()), "game complete")
            }
        }
    }

    public func thenInputControlIs(_ values: [InputControlValuesString]) {
        for expected in values {
            let actual = game.inputControl()
            assertField("input control Frame", expected.frame, String(actual.frame))
            assertField("input control Roll", expected.roll, String(actual.roll))
            assertField("input control Remaining", expected.remaining, String(actual.remaining))
        }
    }

    // ---- DataType checks ----------------------------------------------------

    public func examplesDataTypePins(_ values: [ValidValuesString]) {
        for value in values {
            let held = try? Pins(value.value)

            XCTAssertEqual(held != nil, isTrue(value.isValid), " Value \(value.value)")
        }
    }

    public func examplesDataTypeScore(_ values: [ValidValuesString]) {
        for value in values {
            let held = try? Score(value.value)

            XCTAssertEqual(held != nil, isTrue(value.isValid), " Value \(value.value)")
        }
    }

    // ---- helpers ------------------------------------------------------------

    /// Flattens the step's table into the pin counts it lists, in order.
    private func pinCounts(_ values: [[String]]) -> [Int] {
        var result: [Int] = []
        for row in values {
            for cell in row where !cell.trimmed.isEmpty {
                if let count = Int(cell.trimmed) { result.append(count) }
            }
        }
        return result
    }

    private func assertFrameEquals(_ expected: FrameValuesString) {
        guard let frame = game.frames().first(where: {
            String($0.number) == expected.frame.trimmed
        }) else {
            XCTFail("no frame numbered \(expected.frame)")
            return
        }

        let where_ = "frame \(expected.frame) "
        assertField(where_ + "Roll1", expected.roll1, frame.roll1.description)
        assertField(where_ + "Roll2", expected.roll2, frame.roll2.description)
        assertField(where_ + "Roll3", expected.roll3, frame.roll3.description)
        assertField(where_ + "Score", expected.score, frame.score.description)
        assertField(where_ + "TotalScore", expected.totalScore, frame.totalScore.description)
    }

    /// Honours the ?DNC? marker the generated *String structs use.
    private func assertField(_ what: String, _ expected: String, _ actual: String) {
        if expected == BowlingGlue.dncString { return }
        XCTAssertEqual(expected.trimmed, actual.trimmed, what)
    }

    private func isTrue(_ text: String) -> Bool {
        return ["yes", "true", "y", "1"].contains(text.trimmed.lowercased())
    }
}

private extension String {
    var trimmed: String { return trimmingCharacters(in: .whitespaces) }
}
