import Foundation

/// Raised when a value does not satisfy its DataType's rule.
public struct DataTypeError: Error, CustomStringConvertible {
    public let message: String
    public init(_ message: String) { self.message = message }
    public var description: String { return message }
}

// ---------------------------------------------------------------------------
// Dollar — a monetary amount: never negative, never finer than a cent.
// Held as whole cents so the arithmetic is exact.
// ---------------------------------------------------------------------------

public struct Dollar: Equatable, Comparable, CustomStringConvertible {
    public let cents: Int

    public init(cents: Int) { self.cents = cents }

    public init(_ value: String) throws {
        let text = value.replacingOccurrences(of: "$", with: "")
            .trimmingCharacters(in: .whitespaces)
        if text.isEmpty { self.cents = 0; return }

        let negative = text.hasPrefix("-")
        let digits = text.drop { $0 == "-" || $0 == "+" }
        let parts = digits.split(separator: ".", maxSplits: 1,
                                 omittingEmptySubsequences: false)
        let whole = parts.count > 0 ? String(parts[0]) : ""
        let frac = parts.count > 1 ? String(parts[1]) : ""

        if whole.isEmpty && frac.isEmpty {
            throw DataTypeError("Not a number: \(value)")
        }
        guard whole.allSatisfy({ $0.isNumber }), frac.allSatisfy({ $0.isNumber }) else {
            throw DataTypeError("Not a number: \(value)")
        }
        if frac.count > 2 {
            throw DataTypeError(
                "Dollar amount must not have more than two decimal digits: \(value)")
        }
        let wv = whole.isEmpty ? 0 : (Int(whole) ?? 0)
        let fv: Int
        switch frac.count {
        case 0: fv = 0
        case 1: fv = (Int(frac) ?? 0) * 10
        default: fv = Int(frac) ?? 0
        }
        let total = wv * 100 + fv
        if negative && total != 0 {
            throw DataTypeError("Dollar amount cannot be negative: \(value)")
        }
        self.cents = total
    }

    public func plus(_ other: Dollar) -> Dollar { Dollar(cents: cents + other.cents) }
    public func minus(_ other: Dollar) -> Dollar { Dollar(cents: cents - other.cents) }
    public func times(_ factor: Int) -> Dollar { Dollar(cents: cents * factor) }

    /// The given percentage of this amount, rounded half up to the nearest cent.
    public func percentOf(_ percentage: Percentage) -> Dollar {
        return Dollar(cents: (cents * percentage.value + 50) / 100)
    }

    public static func < (a: Dollar, b: Dollar) -> Bool { a.cents < b.cents }

    public var description: String {
        let sign = cents < 0 ? "-" : ""
        let c = abs(cents)
        return String(format: "%@%d.%02d", sign, c / 100, c % 100)
    }
}

// ---------------------------------------------------------------------------
// Percentage — 0 to 100 inclusive.
// ---------------------------------------------------------------------------

public struct Percentage: Equatable, CustomStringConvertible {
    public let value: Int

    public init(_ value: Int) { self.value = value }

    public init(_ value: String) throws {
        let text = value.replacingOccurrences(of: "%", with: "")
            .trimmingCharacters(in: .whitespaces)
        guard let n = Int(text) else {
            throw DataTypeError("Not a number: \(value)")
        }
        guard (0...100).contains(n) else {
            throw DataTypeError("Percentage must be between 0 and 100: \(value)")
        }
        self.value = n
    }

    public var description: String { return String(value) }
}

// ---------------------------------------------------------------------------
// SimpleText — alphabetic, numeric, space, hyphen, period, comma.
// ---------------------------------------------------------------------------

public struct SimpleText: Equatable, CustomStringConvertible {
    public let value: String

    public init(unchecked value: String) { self.value = value }

    public init(_ value: String) throws {
        let allowed = CharacterSet.alphanumerics
            .union(CharacterSet(charactersIn: " ,.-"))
        guard value.unicodeScalars.allSatisfy({ allowed.contains($0) }) else {
            throw DataTypeError("Invalid SimpleText: \(value)")
        }
        self.value = value
    }

    public var description: String { return value }
}

// ---------------------------------------------------------------------------
// IDForm — exactly five characters, beginning with Q.
// ---------------------------------------------------------------------------

public struct IDForm: Equatable, Hashable, CustomStringConvertible {
    public let value: String

    public init(_ value: String) throws {
        guard value.count == 5 && value.hasPrefix("Q") else {
            throw DataTypeError("Must be 5 characters starting with Q")
        }
        self.value = value
    }

    public var description: String { return value }
}
