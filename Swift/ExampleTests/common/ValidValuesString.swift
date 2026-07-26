public struct ValidValuesString: CustomStringConvertible, Equatable {
    public let value: String
    public let isValid: String
    public let notes: String

    public init(value: String, isValid: String, notes: String) {
        self.value = value
        self.isValid = isValid
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.value = v.count > 0 ? v[0] : ""
        self.isValid = v.count > 1 ? v[1] : ""
        self.notes = v.count > 2 ? v[2] : ""
    }

    public var description: String {
        return "Value=\(value), IsValid=\(isValid), Notes=\(notes)"
    }
}
