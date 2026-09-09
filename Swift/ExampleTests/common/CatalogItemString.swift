public struct CatalogItemString: CustomStringConvertible, Equatable {
    public let name: String
    public let price: String

    public init(name: String, price: String) {
        self.name = name
        self.price = price
    }

    public init(fromArray v: [String]) {
        self.name = v.count > 0 ? v[0] : ""
        self.price = v.count > 1 ? v[1] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> CatalogItemString {
        let parts = Tokens.require(text, 2, "CatalogItem")
        return CatalogItemString(name: parts[0], price: parts[1])
    }

    public var description: String {
        return Tokens.token(name) + " " + Tokens.token(price)
    }

    public static let dncString = "?DNC?"

    public static func == (a: CatalogItemString, b: CatalogItemString) -> Bool {
        return (a.name == dncString || b.name == dncString || a.name == b.name)
            && (a.price == dncString || b.price == dncString || a.price == b.price)
    }
}
