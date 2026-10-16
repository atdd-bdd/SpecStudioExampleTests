public struct ShippingInputString: CustomStringConvertible, Equatable {
    public let totalPrice: DollarString
    public let shippingCost: DollarString
    public let notes: String

    public init(totalPrice: DollarString, shippingCost: DollarString, notes: String) {
        self.totalPrice = totalPrice
        self.shippingCost = shippingCost
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalPrice = DollarString(v.count > 0 ? v[0] : "")
        self.shippingCost = DollarString(v.count > 1 ? v[1] : "")
        self.notes = v.count > 2 ? v[2] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ShippingInputString {
        let parts = Tokens.require(text, 3, "ShippingInput")
        return ShippingInputString(totalPrice: DollarString(parts[0]), shippingCost: DollarString(parts[1]), notes: parts[2])
    }

    public var description: String {
        return Tokens.token(totalPrice.value) + " " + Tokens.token(shippingCost.value) + " " + Tokens.token(notes)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ShippingInputString, b: ShippingInputString) -> Bool {
        return a.totalPrice == b.totalPrice
            && a.shippingCost == b.shippingCost
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
