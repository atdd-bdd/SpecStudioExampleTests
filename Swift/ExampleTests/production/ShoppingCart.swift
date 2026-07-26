public struct ShoppingCart {
    public let items: OrderItemCollection
    public let shipping: Dollar
    public let discount: Dollar
    public let totalPrice: Dollar
    public let shippingAddress: Address
    public let billingAddress: Address

    public init(items: OrderItemCollection, shipping: Dollar, discount: Dollar, totalPrice: Dollar, shippingAddress: Address, billingAddress: Address) {
        self.items = items
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.shippingAddress = shippingAddress
        self.billingAddress = billingAddress
    }
}
