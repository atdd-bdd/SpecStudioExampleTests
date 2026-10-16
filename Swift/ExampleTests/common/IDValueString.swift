public struct IDValueString: CustomStringConvertible, Equatable {
    public let iD: IDFormString
    public let value: String

    public init(iD: IDFormString, value: String) {
        self.iD = iD
        self.value = value
    }

    public init(fromArray v: [String]) {
        self.iD = IDFormString(v.count > 0 ? v[0] : "")
        self.value = v.count > 1 ? v[1] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> IDValueString {
        let parts = Tokens.require(text, 2, "IDValue")
        return IDValueString(iD: IDFormString(parts[0]), value: parts[1])
    }

    public var description: String {
        return Tokens.token(iD.value) + " " + Tokens.token(value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: IDValueString, b: IDValueString) -> Bool {
        return a.iD == b.iD
            && (a.value == dncString || b.value == dncString || a.value == b.value)
    }
}
