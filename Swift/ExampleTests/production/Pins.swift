import Foundation

/// The number of pins knocked down by one roll, or -1 (TBR) when the roll has not
/// happened yet.
///
/// The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and -2
/// are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls that
/// are still to come. The initialiser refuses exactly the invalid ones, so a
/// number out of range fails the same way an unparseable one does.
public struct Pins: Equatable, CustomStringConvertible {
    /// Marker for a roll that has not been made: the integer the spec defines TBR as.
    public static let tbrValue = -1

    public static let max = 10

    /// The value a roll not yet made carries.
    public static let tbr = Pins(count: tbrValue)

    public let value: Int

    public enum PinsError: Error, CustomStringConvertible {
        case notANumber(String)
        case outOfRange(Int)

        public var description: String {
            switch self {
            case .notANumber(let t): return "Not a number of pins: \(t)"
            case .outOfRange(let c): return "Roll must be between 0 and \(Pins.max), got \(c)"
            }
        }
    }

    /// From the text form a table cell holds.
    public init(_ text: String) throws {
        let trimmed = text.trimmingCharacters(in: .whitespaces)
        guard let count = Int(trimmed) else { throw PinsError.notANumber(trimmed) }
        if count != Pins.tbrValue && (count < 0 || count > Pins.max) {
            throw PinsError.outOfRange(count)
        }
        value = count
    }

    /// The roll of a count already known to be in range.
    public init(count: Int) {
        value = count
    }

    /// False when this is TBR -- the roll has not been made.
    public var isRolled: Bool { return value != Pins.tbrValue }

    /// Pin count, or -1 when the roll has not been made.
    public var count: Int { return value }

    public var isStrike: Bool { return isRolled && value == Pins.max }

    /// The text form: what a table cell holds.
    public var description: String { return String(value) }
}
