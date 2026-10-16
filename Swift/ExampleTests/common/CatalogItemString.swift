public struct CatalogItemString: CustomStringConvertible, Equatable {
    public let name: SimpleTextString
    public let price: DollarString

    public init(name: SimpleTextString, price: DollarString) {
        self.name = name
        self.price = price
    }

    public init(fromArray v: [String]) {
        self.name = SimpleTextString(v.count > 0 ? v[0] : "")
        self.price = DollarString(v.count > 1 ? v[1] : "")
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> CatalogItemString {
        let parts = Tokens.require(text, 2, "CatalogItem")
        return CatalogItemString(name: SimpleTextString(parts[0]), price: DollarString(parts[1]))
    }

    public var description: String {
        return Tokens.token(name.value) + " " + Tokens.token(price.value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: CatalogItemString, b: CatalogItemString) -> Bool {
        return a.name == b.name
            && a.price == b.price
    }
}
