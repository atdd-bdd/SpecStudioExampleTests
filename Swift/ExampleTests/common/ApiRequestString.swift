public struct ApiRequestString: CustomStringConvertible, Equatable {
    public let method: String
    public let page: String
    public let parameter: String
    public let body: String

    public init(method: String, page: String, parameter: String, body: String) {
        self.method = method
        self.page = page
        self.parameter = parameter
        self.body = body
    }

    public init(fromArray v: [String]) {
        self.method = v.count > 0 ? v[0] : ""
        self.page = v.count > 1 ? v[1] : ""
        self.parameter = v.count > 2 ? v[2] : ""
        self.body = v.count > 3 ? v[3] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ApiRequestString {
        let parts = Tokens.require(text, 4, "ApiRequest")
        return ApiRequestString(method: parts[0], page: parts[1], parameter: parts[2], body: parts[3])
    }

    public var description: String {
        return Tokens.token(method) + " " + Tokens.token(page) + " " + Tokens.token(parameter) + " " + Tokens.token(body)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ApiRequestString, b: ApiRequestString) -> Bool {
        return (a.method == dncString || b.method == dncString || a.method == b.method)
            && (a.page == dncString || b.page == dncString || a.page == b.page)
            && (a.parameter == dncString || b.parameter == dncString || a.parameter == b.parameter)
            && (a.body == dncString || b.body == dncString || a.body == b.body)
    }
}
