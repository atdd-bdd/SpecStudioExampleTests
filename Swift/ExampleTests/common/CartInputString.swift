public struct CartInputString: CustomStringConvertible, Equatable {
    public let totalItems: DollarString
    public let shipping: DollarString
    public let discount: DollarString
    public let totalPrice: DollarString
    public let notes: String

    public init(totalItems: DollarString, shipping: DollarString, discount: DollarString, totalPrice: DollarString, notes: String) {
        self.totalItems = totalItems
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalItems = DollarString(v.count > 0 ? v[0] : "")
        self.shipping = DollarString(v.count > 1 ? v[1] : "")
        self.discount = DollarString(v.count > 2 ? v[2] : "")
        self.totalPrice = DollarString(v.count > 3 ? v[3] : "")
        self.notes = v.count > 4 ? v[4] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> CartInputString {
        let parts = Tokens.require(text, 5, "CartInput")
        return CartInputString(totalItems: DollarString(parts[0]), shipping: DollarString(parts[1]), discount: DollarString(parts[2]), totalPrice: DollarString(parts[3]), notes: parts[4])
    }

    public var description: String {
        return Tokens.token(totalItems.value) + " " + Tokens.token(shipping.value) + " " + Tokens.token(discount.value) + " " + Tokens.token(totalPrice.value) + " " + Tokens.token(notes)
    }

    public static let dncString = "?DNC?"

    public static func == (a: CartInputString, b: CartInputString) -> Bool {
        return a.totalItems == b.totalItems
            && a.shipping == b.shipping
            && a.discount == b.discount
            && a.totalPrice == b.totalPrice
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
