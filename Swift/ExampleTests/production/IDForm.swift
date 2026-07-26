public struct IDForm: Equatable, CustomStringConvertible {
    public let value: String

    public init(_ value: String) {
        self.value = value
    }

    public var isValid: Bool {
        return ["q1234"].contains(value.lowercased())
    }

    public var description: String { return value }
}
