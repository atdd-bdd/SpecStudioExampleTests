public struct Percentage: Equatable, CustomStringConvertible {
    public let value: String

    public init(_ value: String) {
        self.value = value
    }

    public var isValid: Bool {
        return ["0", "99", "100"].contains(value.lowercased())
    }

    public var description: String { return value }
}
