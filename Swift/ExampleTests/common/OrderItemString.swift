public struct OrderItemString: CustomStringConvertible, Equatable {
    public let name: SimpleTextString
    public let quantity: String
    public let price: DollarString
    public let itemTotal: DollarString

    public init(name: SimpleTextString, quantity: String, price: DollarString, itemTotal: DollarString) {
        self.name = name
        self.quantity = quantity
        self.price = price
        self.itemTotal = itemTotal
    }

    public init(fromArray v: [String]) {
        self.name = SimpleTextString(v.count > 0 ? v[0] : "")
        self.quantity = v.count > 1 ? v[1] : ""
        self.price = DollarString(v.count > 2 ? v[2] : "")
        self.itemTotal = DollarString(v.count > 3 ? v[3] : "")
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> OrderItemString {
        let parts = Tokens.require(text, 4, "OrderItem")
        return OrderItemString(name: SimpleTextString(parts[0]), quantity: parts[1], price: DollarString(parts[2]), itemTotal: DollarString(parts[3]))
    }

    public var description: String {
        return Tokens.token(name.value) + " " + Tokens.token(quantity) + " " + Tokens.token(price.value) + " " + Tokens.token(itemTotal.value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: OrderItemString, b: OrderItemString) -> Bool {
        return a.name == b.name
            && (a.quantity == dncString || b.quantity == dncString || a.quantity == b.quantity)
            && a.price == b.price
            && a.itemTotal == b.itemTotal
    }
}
