public struct ShoppingCartString: CustomStringConvertible, Equatable {
    public let items: String
    public let shipping: String
    public let discount: String
    public let totalPrice: String
    public let shippingAddress: String
    public let billingAddress: String

    public init(items: String, shipping: String, discount: String, totalPrice: String, shippingAddress: String, billingAddress: String) {
        self.items = items
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.shippingAddress = shippingAddress
        self.billingAddress = billingAddress
    }

    public init(fromArray v: [String]) {
        self.items = v.count > 0 ? v[0] : ""
        self.shipping = v.count > 1 ? v[1] : ""
        self.discount = v.count > 2 ? v[2] : ""
        self.totalPrice = v.count > 3 ? v[3] : ""
        self.shippingAddress = v.count > 4 ? v[4] : ""
        self.billingAddress = v.count > 5 ? v[5] : ""
    }

    public var description: String {
        return "Items=\(items), Shipping=\(shipping), Discount=\(discount), TotalPrice=\(totalPrice), ShippingAddress=\(shippingAddress), BillingAddress=\(billingAddress)"
    }
}
