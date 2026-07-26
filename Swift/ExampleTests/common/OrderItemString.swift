public struct OrderItemString: CustomStringConvertible, Equatable {
    public let name: String
    public let quantity: String
    public let price: String
    public let itemTotal: String

    public init(name: String, quantity: String, price: String, itemTotal: String) {
        self.name = name
        self.quantity = quantity
        self.price = price
        self.itemTotal = itemTotal
    }

    public init(fromArray v: [String]) {
        self.name = v.count > 0 ? v[0] : ""
        self.quantity = v.count > 1 ? v[1] : ""
        self.price = v.count > 2 ? v[2] : ""
        self.itemTotal = v.count > 3 ? v[3] : ""
    }

    public var description: String {
        return "Name=\(name), Quantity=\(quantity), Price=\(price), ItemTotal=\(itemTotal)"
    }
}
