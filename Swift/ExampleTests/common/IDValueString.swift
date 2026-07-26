public struct IDValueString: CustomStringConvertible, Equatable {
    public let iD: String
    public let value: String

    public init(iD: String, value: String) {
        self.iD = iD
        self.value = value
    }

    public init(fromArray v: [String]) {
        self.iD = v.count > 0 ? v[0] : ""
        self.value = v.count > 1 ? v[1] : ""
    }

    public var description: String {
        return "ID=\(iD), Value=\(value)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: IDValueString, b: IDValueString) -> Bool {
        return (a.iD == dncString || b.iD == dncString || a.iD == b.iD)
            && (a.value == dncString || b.value == dncString || a.value == b.value)
    }
}
