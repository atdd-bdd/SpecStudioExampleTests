public struct AdderString: CustomStringConvertible, Equatable {
    public let number1: String
    public let number2: String
    public let result: String

    public init(number1: String, number2: String, result: String) {
        self.number1 = number1
        self.number2 = number2
        self.result = result
    }

    public init(fromArray v: [String]) {
        self.number1 = v.count > 0 ? v[0] : ""
        self.number2 = v.count > 1 ? v[1] : ""
        self.result = v.count > 2 ? v[2] : ""
    }

    public var description: String {
        return "number1=\(number1), number2=\(number2), result=\(result)"
    }
}
