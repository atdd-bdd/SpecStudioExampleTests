public struct ItemPriceInputString: CustomStringConvertible, Equatable {
    public let totalItems: DollarString

    public init(totalItems: DollarString) {
        self.totalItems = totalItems
    }

    public init(fromArray v: [String]) {
        self.totalItems = DollarString(v.count > 0 ? v[0] : "")
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ItemPriceInputString {
        let parts = Tokens.require(text, 1, "ItemPriceInput")
        return ItemPriceInputString(totalItems: DollarString(parts[0]))
    }

    public var description: String {
        return Tokens.token(totalItems.value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ItemPriceInputString, b: ItemPriceInputString) -> Bool {
        return a.totalItems == b.totalItems
    }
}
