import XCTest

final class BowlingTests: XCTestCase {

    func testAddingARoll() {
        let glue = BowlingGlue()
        glue.givenRollsAre([
            ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10"],
        ])
        glue.whenRollIs([
            ["10"],
        ])
        glue.thenRollsBecome([
            ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"],
        ])
    }

    func testFullGameComputeAndDisplay() {
        let glue = BowlingGlue()
        glue.givenRollsAre([
            ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"],
        ])
        glue.whenScored()
        glue.thenDisplayIs("| 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |\n| 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |")
    }

    func testAGameInSteps() {
        let glue = BowlingGlue()
        glue.givenRollsAre([
            ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"],
        ])
        glue.whenScored()
        glue.thenFrameValuesAre([
            FrameValuesString(fromArray: ["1", "5", "5", "4", "14", "14"]),
            FrameValuesString(fromArray: ["2", "4", "5", "8", "9", "23"]),
            FrameValuesString(fromArray: ["3", "8", "2", "10", "20", "43"]),
            FrameValuesString(fromArray: ["4", "10", "0", "10", "20", "63"]),
            FrameValuesString(fromArray: ["5", "0", "10", "10", "20", "83"]),
            FrameValuesString(fromArray: ["6", "10", "6", "2", "18", "101"]),
            FrameValuesString(fromArray: ["7", "6", "2", "10", "8", "109"]),
            FrameValuesString(fromArray: ["8", "10", "4", "6", "20", "129"]),
            FrameValuesString(fromArray: ["9", "4", "6", "10", "20", "149"]),
            FrameValuesString(fromArray: ["10", "10", "10", "-1", "-1", "-1"]),
        ])
        glue.givenFrameValuesAreAsPrevious()
        glue.thenDisplayValuesAre([
            FrameDisplayString(fromArray: ["1", "5", "/", "", "14"]),
            FrameDisplayString(fromArray: ["2", "4", "5", "", "23"]),
            FrameDisplayString(fromArray: ["3", "8", "/", "", "43"]),
            FrameDisplayString(fromArray: ["4", "X", "", "", "63"]),
            FrameDisplayString(fromArray: ["5", "-", "/", "", "83"]),
            FrameDisplayString(fromArray: ["6", "X", "", "", "101"]),
            FrameDisplayString(fromArray: ["7", "6", "2", "", "109"]),
            FrameDisplayString(fromArray: ["8", "X", "", "", "129"]),
            FrameDisplayString(fromArray: ["9", "4", "/", "", "149"]),
            FrameDisplayString(fromArray: ["10", "X", "X", "", ""]),
        ])
        glue.thenGameCompleteIs([
            ["false"],
        ])
        glue.thenInputControlIs([
            InputControlValuesString(fromArray: ["10", "3", "10"]),
        ])
    }

    func testCheckForGameComplete() {
        let glue = BowlingGlue()
        glue.givenRollsAre([
            ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10", "10"],
        ])
        glue.whenScored()
        glue.thenGameCompleteIs([
            ["true"],
        ])
    }

    func testValuesForTenthFrame() {
        let glue = BowlingGlue()
        glue.givenRollsForTenthFrameAre([
            ["10", "10"],
        ])
        glue.whenScored()
        glue.thenThenTenthFrameValuesAre([
            FrameValuesString(fromArray: ["10", "10", "10", "-1", "-1", "-1"]),
        ])
    }

    func testInputControlShouldBeForNextFrame() {
        let glue = BowlingGlue()
        glue.givenRollsAre([
            ["10"],
        ])
        glue.whenScored()
        glue.thenInputControlIs([
            InputControlValuesString(fromArray: ["2", "1", "10"]),
        ])
    }

    func testTryToAddInvalidRoll() {
        let glue = BowlingGlue()
        glue.givenRollsAre([
            ["5"],
        ])
        glue.whenScored()
        glue.whenRollIs([
            ["6"],
        ])
        glue.thenRollsBecome([
            ["5"],
        ])
    }

    func testDataTypePins() {
        let glue = BowlingGlue()
        glue.examplesDataTypePins([
            ValidValuesString(fromArray: ["0", "true", ""]),
            ValidValuesString(fromArray: ["10", "true", ""]),
            ValidValuesString(fromArray: ["11", "false", ""]),
            ValidValuesString(fromArray: ["-2", "false", ""]),
            ValidValuesString(fromArray: ["-1", "true", "Used for To Be Rolled"]),
        ])
    }

    func testDataTypeScore() {
        let glue = BowlingGlue()
        glue.examplesDataTypeScore([
            ValidValuesString(fromArray: ["0", "yes", ""]),
            ValidValuesString(fromArray: ["300", "yes", ""]),
            ValidValuesString(fromArray: ["301", "no", ""]),
            ValidValuesString(fromArray: ["-1", "yes", "To be scored"]),
        ])
    }

}
