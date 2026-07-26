public struct ResultValueString: CustomStringConvertible, Equatable {
    public let sum: String

    public init(sum: String) {
        self.sum = sum
    }

    public init(fromArray v: [String]) {
        self.sum = v.count > 0 ? v[0] : ""
    }

    public var description: String {
        return "Sum=\(sum)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: ResultValueString, b: ResultValueString) -> Bool {
        return (a.sum == dncString || b.sum == dncString || a.sum == b.sum)
    }
}
