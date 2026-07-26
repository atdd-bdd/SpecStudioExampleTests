public struct FilterValueString: CustomStringConvertible, Equatable {
    public let value: String

    public init(value: String) {
        self.value = value
    }

    public init(fromArray v: [String]) {
        self.value = v.count > 0 ? v[0] : ""
    }

    public var description: String {
        return "Value=\(value)"
    }
}
