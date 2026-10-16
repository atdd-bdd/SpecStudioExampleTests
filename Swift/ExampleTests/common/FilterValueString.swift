public struct FilterValueString: CustomStringConvertible, Equatable {
    public let value: IDFormString

    public init(value: IDFormString) {
        self.value = value
    }

    public init(fromArray v: [String]) {
        self.value = IDFormString(v.count > 0 ? v[0] : "")
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> FilterValueString {
        let parts = Tokens.require(text, 1, "FilterValue")
        return FilterValueString(value: IDFormString(parts[0]))
    }

    public var description: String {
        return Tokens.token(value.value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: FilterValueString, b: FilterValueString) -> Bool {
        return a.value == b.value
    }
}
