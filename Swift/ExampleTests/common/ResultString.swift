public struct ResultString: CustomStringConvertible, Equatable {
    public let addressMatches: String

    public init(addressMatches: String) {
        self.addressMatches = addressMatches
    }

    public init(fromArray v: [String]) {
        self.addressMatches = v.count > 0 ? v[0] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ResultString {
        let parts = Tokens.require(text, 1, "Result")
        return ResultString(addressMatches: parts[0])
    }

    public var description: String {
        return Tokens.token(addressMatches)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ResultString, b: ResultString) -> Bool {
        return (a.addressMatches == dncString || b.addressMatches == dncString || a.addressMatches == b.addressMatches)
    }
}
