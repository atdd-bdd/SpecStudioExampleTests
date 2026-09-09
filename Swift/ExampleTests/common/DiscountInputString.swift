public struct DiscountInputString: CustomStringConvertible, Equatable {
    public let totalPrice: String
    public let discount: String
    public let notes: String

    public init(totalPrice: String, discount: String, notes: String) {
        self.totalPrice = totalPrice
        self.discount = discount
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalPrice = v.count > 0 ? v[0] : ""
        self.discount = v.count > 1 ? v[1] : ""
        self.notes = v.count > 2 ? v[2] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> DiscountInputString {
        let parts = Tokens.require(text, 3, "DiscountInput")
        return DiscountInputString(totalPrice: parts[0], discount: parts[1], notes: parts[2])
    }

    public var description: String {
        return Tokens.token(totalPrice) + " " + Tokens.token(discount) + " " + Tokens.token(notes)
    }

    public static let dncString = "?DNC?"

    public static func == (a: DiscountInputString, b: DiscountInputString) -> Bool {
        return (a.totalPrice == dncString || b.totalPrice == dncString || a.totalPrice == b.totalPrice)
            && (a.discount == dncString || b.discount == dncString || a.discount == b.discount)
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
