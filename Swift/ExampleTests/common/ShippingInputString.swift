public struct ShippingInputString: CustomStringConvertible, Equatable {
    public let totalPrice: String
    public let shippingCost: String
    public let notes: String

    public init(totalPrice: String, shippingCost: String, notes: String) {
        self.totalPrice = totalPrice
        self.shippingCost = shippingCost
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalPrice = v.count > 0 ? v[0] : ""
        self.shippingCost = v.count > 1 ? v[1] : ""
        self.notes = v.count > 2 ? v[2] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ShippingInputString {
        let parts = Tokens.require(text, 3, "ShippingInput")
        return ShippingInputString(totalPrice: parts[0], shippingCost: parts[1], notes: parts[2])
    }

    public var description: String {
        return Tokens.token(totalPrice) + " " + Tokens.token(shippingCost) + " " + Tokens.token(notes)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ShippingInputString, b: ShippingInputString) -> Bool {
        return (a.totalPrice == dncString || b.totalPrice == dncString || a.totalPrice == b.totalPrice)
            && (a.shippingCost == dncString || b.shippingCost == dncString || a.shippingCost == b.shippingCost)
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
