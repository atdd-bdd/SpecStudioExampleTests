import Foundation

/// A frame score or running total, or -1 (TBS) while the rolls it depends on have not
/// all been made.
///
/// The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect game
/// -- and rejects 301; -1 is valid only because the spec defines TBS as -1:
/// a frame ending in a strike or a spare cannot be scored until its bonus
/// rolls exist, and "not yet computable" is a normal state rather than an error.
public struct Score: Equatable, CustomStringConvertible {
    /// Marker for a score that cannot be computed yet: the integer the spec defines TBS as.
    public static let tbsValue = -1

    public static let min = 0
    public static let max = 300

    /// The value a frame not yet scorable carries.
    public static let tbs = Score(points: tbsValue)

    public let value: Int

    public enum ScoreError: Error, CustomStringConvertible {
        case notANumber(String)
        case outOfRange(Int)

        public var description: String {
            switch self {
            case .notANumber(let t): return "Not a score: \(t)"
            case .outOfRange(let p):
                return "Score must be between \(Score.min) and \(Score.max), got \(p)"
            }
        }
    }

    /// From the text form a table cell holds.
    public init(_ text: String) throws {
        let trimmed = text.trimmingCharacters(in: .whitespaces)
        guard let points = Int(trimmed) else { throw ScoreError.notANumber(trimmed) }
        if points != Score.tbsValue && (points < Score.min || points > Score.max) {
            throw ScoreError.outOfRange(points)
        }
        value = points
    }

    /// The score of a total already known to be in range.
    public init(points: Int) {
        value = points
    }

    public var isComputable: Bool { return value != Score.tbsValue }

    /// Points, or -1 when not yet computable.
    public var points: Int { return value }

    /// The text form: what a table cell holds.
    public var description: String { return String(value) }
}
