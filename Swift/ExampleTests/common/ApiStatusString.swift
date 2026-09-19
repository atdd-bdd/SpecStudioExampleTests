public struct ApiStatusString: CustomStringConvertible, Equatable {
    public let code: String

    public init(code: String) {
        self.code = code
    }

    public init(fromArray v: [String]) {
        self.code = v.count > 0 ? v[0] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ApiStatusString {
        let parts = Tokens.require(text, 1, "ApiStatus")
        return ApiStatusString(code: parts[0])
    }

    public var description: String {
        return Tokens.token(code)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ApiStatusString, b: ApiStatusString) -> Bool {
        return (a.code == dncString || b.code == dncString || a.code == b.code)
    }
}
