public struct ShoppingCartString: CustomStringConvertible, Equatable {
    public let items: String
    public let shipping: DollarString
    public let discount: DollarString
    public let totalPrice: DollarString
    public let shippingAddress: AddressString
    public let billingAddress: AddressString

    public init(items: String, shipping: DollarString, discount: DollarString, totalPrice: DollarString, shippingAddress: AddressString, billingAddress: AddressString) {
        self.items = items
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.shippingAddress = shippingAddress
        self.billingAddress = billingAddress
    }

    public init(fromArray v: [String]) {
        self.items = v.count > 0 ? v[0] : ""
        self.shipping = DollarString(v.count > 1 ? v[1] : "")
        self.discount = DollarString(v.count > 2 ? v[2] : "")
        self.totalPrice = DollarString(v.count > 3 ? v[3] : "")
        self.shippingAddress = AddressString(fromArray: [])
        self.billingAddress = AddressString(fromArray: [])
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ShoppingCartString {
        let parts = Tokens.require(text, 6, "ShoppingCart")
        return ShoppingCartString(items: parts[0], shipping: DollarString(parts[1]), discount: DollarString(parts[2]), totalPrice: DollarString(parts[3]), shippingAddress: AddressString.fromText(parts[4]), billingAddress: AddressString.fromText(parts[5]))
    }

    public var description: String {
        return Tokens.token(items) + " " + Tokens.token(shipping.value) + " " + Tokens.token(discount.value) + " " + Tokens.token(totalPrice.value) + " " + Tokens.nested(shippingAddress.description) + " " + Tokens.nested(billingAddress.description)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ShoppingCartString, b: ShoppingCartString) -> Bool {
        return (a.items == dncString || b.items == dncString || a.items == b.items)
            && a.shipping == b.shipping
            && a.discount == b.discount
            && a.totalPrice == b.totalPrice
            && a.shippingAddress == b.shippingAddress
            && a.billingAddress == b.billingAddress
    }
}
