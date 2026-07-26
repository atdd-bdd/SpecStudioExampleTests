public struct ShoppingCartString: CustomStringConvertible, Equatable {
    public let items: String
    public let shipping: String
    public let discount: String
    public let totalPrice: String
    public let shippingAddress: AddressString
    public let billingAddress: AddressString

    public init(items: String, shipping: String, discount: String, totalPrice: String, shippingAddress: AddressString, billingAddress: AddressString) {
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
        self.shippingAddress = AddressString(fromArray: [])
        self.billingAddress = AddressString(fromArray: [])
    }

    public var description: String {
        return "Items=\(items), Shipping=\(shipping), Discount=\(discount), TotalPrice=\(totalPrice), ShippingAddress=\(shippingAddress), BillingAddress=\(billingAddress)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: ShoppingCartString, b: ShoppingCartString) -> Bool {
        return (a.items == dncString || b.items == dncString || a.items == b.items)
            && (a.shipping == dncString || b.shipping == dncString || a.shipping == b.shipping)
            && (a.discount == dncString || b.discount == dncString || a.discount == b.discount)
            && (a.totalPrice == dncString || b.totalPrice == dncString || a.totalPrice == b.totalPrice)
            && a.shippingAddress == b.shippingAddress
            && a.billingAddress == b.billingAddress
    }
}
