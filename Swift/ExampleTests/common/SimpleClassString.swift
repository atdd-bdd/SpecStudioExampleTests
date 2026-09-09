public struct SimpleClassString: CustomStringConvertible, Equatable {
    public let anInt: String
    public let aString: String

    public init(anInt: String, aString: String) {
        self.anInt = anInt
        self.aString = aString
    }

    public init(fromArray v: [String]) {
        self.anInt = v.count > 0 ? v[0] : ""
        self.aString = v.count > 1 ? v[1] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> SimpleClassString {
        let parts = Tokens.require(text, 2, "SimpleClass")
        return SimpleClassString(anInt: parts[0], aString: parts[1])
    }

    public var description: String {
        return Tokens.token(anInt) + " " + Tokens.token(aString)
    }

    public static let dncString = "?DNC?"

    public static func == (a: SimpleClassString, b: SimpleClassString) -> Bool {
        return (a.anInt == dncString || b.anInt == dncString || a.anInt == b.anInt)
            && (a.aString == dncString || b.aString == dncString || a.aString == b.aString)
    }
}
