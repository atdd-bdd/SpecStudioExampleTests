import Foundation

/// One frame's rolls as the scoresheet shows them, plus its score.
///
/// roll1..roll3 are the three rolls starting at this frame's first roll -- not
/// only the rolls bowled in this frame. After a strike, roll2 and roll3 are the
/// next frame's rolls, because those are what score this one. The spec's
/// FrameValues table is written that way: frame 4 is a strike and still lists
/// Roll2 and Roll3 as the two rolls that follow it.
public struct Frame {
    public let number: Int
    public let roll1: Pins
    public let roll2: Pins
    public let roll3: Pins
    public let score: Score
    public let totalScore: Score

    public var isStrike: Bool { return roll1.isStrike }

    /// A spare only counts when it is not already a strike.
    public var isSpare: Bool {
        return !isStrike && roll1.isRolled && roll2.isRolled
            && roll1.count + roll2.count == Pins.max
    }
}

/// How one frame is written on a scoresheet: X for a strike, / for a spare,
/// - for a gutter ball, blank for a roll not yet made.
///
/// mark3 is only ever filled on the tenth frame, the only frame that can have a
/// third roll of its own.
public struct FrameMarks {
    public let frame: String
    public let mark1: String
    public let mark2: String
    public let mark3: String
    public let totalScore: String

    /// The mark columns joined, as they appear in the top row of the display.
    public var marks: String { return mark1 + mark2 + mark3 }
}

/// Where the next roll goes, and how many pins are standing for it -- what a
/// keypad needs in order to disable the buttons that cannot be pressed.
public struct InputControl {
    public let frame: Int
    public let roll: Int
    public let remaining: Int
}

/// A game of ten-pin bowling: the rolls made so far, the scoresheet they
/// produce, and what the next roll is allowed to be.
///
/// All the scoring lives here rather than in the test glue. The glue's job is to
/// hand rolls in and read values out.
public class BowlingGame {
    private static let frameCount = 10

    private var rolls: [Int] = []

    /// True when the game was seeded with the tenth frame's rolls alone, so the
    /// tenth frame can be examined without bowling the nine before it. The
    /// earlier frames then have no rolls, which is why their scores -- and every
    /// running total -- stay TBS.
    private var tenthFrameOnly = false

    public init() {}

    public func allRolls() -> [Int] { return rolls }

    /// Replaces the rolls outright. Setup, not play -- no validation.
    public func setRolls(_ pinCounts: [Int]) {
        rolls = pinCounts
        tenthFrameOnly = false
    }

    /// Seeds only the tenth frame; frames 1..9 are left unbowled.
    public func setTenthFrameRolls(_ pinCounts: [Int]) {
        rolls = pinCounts
        tenthFrameOnly = true
    }

    /// Bowls one roll. Returns false and changes nothing when the roll is
    /// impossible -- more pins than are standing, or a game already over.
    @discardableResult
    public func addRoll(_ pinCount: Int) -> Bool {
        if pinCount < 0 || pinCount > Pins.max { return false }
        if isComplete() { return false }
        if pinCount > inputControl().remaining { return false }

        rolls.append(pinCount)
        return true
    }

    /// Recomputes the scoresheet. Scoring is derived on demand, so this exists
    /// to give the specification's "When scored" step something real to drive.
    public func score() { _ = frames() }

    // ---- scoresheet ---------------------------------------------------------

    public func frames() -> [Frame] {
        var result: [Frame] = []
        let starts = frameStarts()
        var running = 0
        var runningKnown = true

        for f in 1...BowlingGame.frameCount {
            let start = starts[f]
            let roll1 = pinsAt(start)
            let roll2 = pinsAt(start + 1)
            let roll3 = pinsAt(start + 2)

            let strike = roll1.isStrike
            let spare = !strike && roll1.isRolled && roll2.isRolled
                     && roll1.count + roll2.count == Pins.max

            // A strike or a spare is only worth what the following rolls make it,
            // so it needs three rolls before it can be scored at all.
            let needed = (strike || spare) ? 3 : 2

            var score = Score.tbs
            var total = Score.tbs
            if allRolled(from: start, count: needed) {
                let points = roll1.count + roll2.count + (needed == 3 ? roll3.count : 0)
                score = Score(points: points)
                if runningKnown {
                    running += points
                    total = Score(points: running)
                }
            } else {
                // Once one frame cannot be scored, no later total can be either.
                runningKnown = false
            }

            result.append(Frame(number: f, roll1: roll1, roll2: roll2, roll3: roll3,
                                score: score, totalScore: total))
        }
        return result
    }

    public func marks() -> [FrameMarks] {
        var result: [FrameMarks] = []

        for frame in frames() {
            var mark1 = ""
            var mark2 = ""
            var mark3 = ""

            if frame.roll1.isRolled {
                mark1 = frame.roll1.isStrike ? "X" : BowlingGame.digit(frame.roll1)
            }

            if frame.number < BowlingGame.frameCount {
                // Frames 1..9 show only their own two rolls; after a strike there
                // is no second mark, even though roll2 holds the next frame's roll.
                if !frame.roll1.isStrike && frame.roll1.isRolled && frame.roll2.isRolled {
                    mark2 = frame.roll1.count + frame.roll2.count == Pins.max
                          ? "/" : BowlingGame.digit(frame.roll2)
                }
            } else {
                if frame.roll2.isRolled {
                    if frame.roll1.isStrike {
                        mark2 = frame.roll2.isStrike ? "X" : BowlingGame.digit(frame.roll2)
                    } else {
                        mark2 = frame.roll1.count + frame.roll2.count == Pins.max
                              ? "/" : BowlingGame.digit(frame.roll2)
                    }
                }
                if frame.roll3.isRolled {
                    let spareOnBonus = frame.roll1.isStrike && !frame.roll2.isStrike
                                    && frame.roll2.count + frame.roll3.count == Pins.max
                    mark3 = spareOnBonus ? "/"
                          : (frame.roll3.isStrike ? "X" : BowlingGame.digit(frame.roll3))
                }
            }

            let total = frame.totalScore.isComputable ? frame.totalScore.description : ""
            result.append(FrameMarks(frame: String(frame.number), mark1: mark1,
                                     mark2: mark2, mark3: mark3, totalScore: total))
        }
        return result
    }

    /// The scoresheet as two rows: marks above, running totals below.
    ///
    /// Each frame's column is as wide as the wider of its two cells, so a frame
    /// whose total reaches three digits widens both rows together and the columns
    /// stay aligned under each other.
    ///
    /// Two rows, no trailing newline: that is what the docstring in the
    /// specification holds, and it is compared as text.
    public func display() -> String {
        var top = ""
        var bottom = ""

        for frame in marks() {
            let width = Swift.max(frame.marks.count, frame.totalScore.count)
            top += "| " + BowlingGame.padRight(frame.marks, width) + " "
            bottom += "| " + BowlingGame.padRight(frame.totalScore, width) + " "
        }
        return top + "|\n" + bottom + "|"
    }

    // ---- state --------------------------------------------------------------

    /// True once the tenth frame has had every roll it is entitled to.
    public func isComplete() -> Bool {
        let start = frameStarts()[BowlingGame.frameCount]
        let roll1 = pinsAt(start)
        let roll2 = pinsAt(start + 1)
        if !roll1.isRolled || !roll2.isRolled { return false }

        let strike = roll1.isStrike
        let spare = !strike && roll1.count + roll2.count == Pins.max
        return (strike || spare) ? pinsAt(start + 2).isRolled : true
    }

    /// Which frame and roll the next ball belongs to, and how many pins stand.
    public func inputControl() -> InputControl {
        let starts = frameStarts()

        for f in 1..<BowlingGame.frameCount {
            let start = starts[f]
            let roll1 = pinsAt(start)
            if !roll1.isRolled { return InputControl(frame: f, roll: 1, remaining: Pins.max) }
            if roll1.isStrike { continue }          // one roll ends the frame
            if !pinsAt(start + 1).isRolled {
                return InputControl(frame: f, roll: 2, remaining: Pins.max - roll1.count)
            }
        }

        let start = starts[BowlingGame.frameCount]
        let roll1 = pinsAt(start)
        let roll2 = pinsAt(start + 1)
        if !roll1.isRolled {
            return InputControl(frame: BowlingGame.frameCount, roll: 1, remaining: Pins.max)
        }
        if !roll2.isRolled {
            return InputControl(frame: BowlingGame.frameCount, roll: 2,
                                remaining: roll1.isStrike ? Pins.max : Pins.max - roll1.count)
        }

        // Third roll of the tenth. After two strikes the rack is full again;
        // after a strike then a non-strike, only what that ball left standing;
        // after a spare, a fresh rack.
        let remaining = (roll1.isStrike && !roll2.isStrike)
            ? Pins.max - roll2.count : Pins.max
        return InputControl(frame: BowlingGame.frameCount, roll: 3, remaining: remaining)
    }

    // ---- helpers ------------------------------------------------------------

    /// Index of each frame's first roll. A strike ends a frame in one roll, so
    /// the next frame starts one later rather than two.
    private func frameStarts() -> [Int] {
        var starts = [Int](repeating: 0, count: BowlingGame.frameCount + 1)

        if tenthFrameOnly {
            // Frames 1..9 are unbowled: point them past every roll so each one
            // reads back as TBR.
            for f in 1..<BowlingGame.frameCount {
                starts[f] = rolls.count + BowlingGame.frameCount * 2
            }
            starts[BowlingGame.frameCount] = 0
            return starts
        }

        var index = 0
        for f in 1..<BowlingGame.frameCount {
            starts[f] = index
            index += (index < rolls.count && rolls[index] == Pins.max) ? 1 : 2
        }
        starts[BowlingGame.frameCount] = index
        return starts
    }

    private func pinsAt(_ index: Int) -> Pins {
        if index < 0 || index >= rolls.count { return Pins.tbr }
        return Pins(count: rolls[index])
    }

    private func allRolled(from start: Int, count: Int) -> Bool {
        for i in 0..<count where !pinsAt(start + i).isRolled { return false }
        return true
    }

    /// A gutter ball is written as a dash, not a zero.
    private static func digit(_ pins: Pins) -> String {
        return pins.count == 0 ? "-" : String(pins.count)
    }

    private static func padRight(_ text: String, _ width: Int) -> String {
        return text + String(repeating: " ", count: Swift.max(0, width - text.count))
    }
}
