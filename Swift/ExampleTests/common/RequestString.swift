public struct RequestString: CustomStringConvertible, Equatable {
    public let method: String
    public let page: String
    public let address: String
    public let benchmark: String
    public let format: String

    public init(method: String, page: String, address: String, benchmark: String, format: String) {
        self.method = method
        self.page = page
        self.address = address
        self.benchmark = benchmark
        self.format = format
    }

    public init(fromArray v: [String]) {
        self.method = v.count > 0 ? v[0] : ""
        self.page = v.count > 1 ? v[1] : ""
        self.address = v.count > 2 ? v[2] : ""
        self.benchmark = v.count > 3 ? v[3] : ""
        self.format = v.count > 4 ? v[4] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> RequestString {
        let parts = Tokens.require(text, 5, "Request")
        return RequestString(method: parts[0], page: parts[1], address: parts[2], benchmark: parts[3], format: parts[4])
    }

    public var description: String {
        return Tokens.token(method) + " " + Tokens.token(page) + " " + Tokens.token(address) + " " + Tokens.token(benchmark) + " " + Tokens.token(format)
    }

    public static let dncString = "?DNC?"

    public static func == (a: RequestString, b: RequestString) -> Bool {
        return (a.method == dncString || b.method == dncString || a.method == b.method)
            && (a.page == dncString || b.page == dncString || a.page == b.page)
            && (a.address == dncString || b.address == dncString || a.address == b.address)
            && (a.benchmark == dncString || b.benchmark == dncString || a.benchmark == b.benchmark)
            && (a.format == dncString || b.format == dncString || a.format == b.format)
    }
}
