public struct OrderItem {
    public let name: SimpleText
    public let quantity: Int
    public let price: Dollar
    public let itemTotal: Dollar

    public init(name: SimpleText, quantity: Int, price: Dollar, itemTotal: Dollar) {
        self.name = name
        self.quantity = quantity
        self.price = price
        self.itemTotal = itemTotal
    }
}
