public struct DiscountInputString: CustomStringConvertible, Equatable {
    public let totalPrice: DollarString
    public let discount: PercentageString
    public let notes: String

    public init(totalPrice: DollarString, discount: PercentageString, notes: String) {
        self.totalPrice = totalPrice
        self.discount = discount
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalPrice = DollarString(v.count > 0 ? v[0] : "")
        self.discount = PercentageString(v.count > 1 ? v[1] : "")
        self.notes = v.count > 2 ? v[2] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> DiscountInputString {
        let parts = Tokens.require(text, 3, "DiscountInput")
        return DiscountInputString(totalPrice: DollarString(parts[0]), discount: PercentageString(parts[1]), notes: parts[2])
    }

    public var description: String {
        return Tokens.token(totalPrice.value) + " " + Tokens.token(discount.value) + " " + Tokens.token(notes)
    }

    public static let dncString = "?DNC?"

    public static func == (a: DiscountInputString, b: DiscountInputString) -> Bool {
        return a.totalPrice == b.totalPrice
            && a.discount == b.discount
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
