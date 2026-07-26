public struct Dollar: Equatable, CustomStringConvertible {
    public let value: String

    public init(_ value: String) {
        self.value = value
    }

    public var isValid: Bool {
        return ["0", "0.01"].contains(value.lowercased())
    }

    public var description: String { return value }
}
