public struct ResponseString: CustomStringConvertible, Equatable {
    public let result: ResultString

    public init(result: ResultString) {
        self.result = result
    }

    public init(fromArray v: [String]) {
        self.result = ResultString(fromArray: [])
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ResponseString {
        let parts = Tokens.require(text, 1, "Response")
        return ResponseString(result: ResultString.fromText(parts[0]))
    }

    public var description: String {
        return Tokens.nested(result.description)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ResponseString, b: ResponseString) -> Bool {
        return a.result == b.result
    }
}
