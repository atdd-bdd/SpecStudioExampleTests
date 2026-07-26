public struct SimpleText: Equatable, CustomStringConvertible {
    public let value: String

    public init(_ value: String) {
        self.value = value
    }

    public var isValid: Bool {
        return ["abc", "ab.", "1234567890", "-a-b"].contains(value.lowercased())
    }

    public var description: String { return value }
}
