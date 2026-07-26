public struct ShoppingCartTyped {
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

    public init(from s: ShoppingCartString) {
        self.items = OrderItemCollection(s.items)
        self.shipping = Dollar(s.shipping)
        self.discount = Dollar(s.discount)
        self.totalPrice = Dollar(s.totalPrice)
        self.shippingAddress = Address(s.shippingAddress)
        self.billingAddress = Address(s.billingAddress)
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "items": String(describing: items),
            "shipping": String(describing: shipping),
            "discount": String(describing: discount),
            "totalPrice": String(describing: totalPrice),
            "shippingAddress": String(describing: shippingAddress),
            "billingAddress": String(describing: billingAddress),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.items = OrderItemCollection(try Json.asString(Json.require(m, "items"), "items"))
        self.shipping = Dollar(try Json.asString(Json.require(m, "shipping"), "shipping"))
        self.discount = Dollar(try Json.asString(Json.require(m, "discount"), "discount"))
        self.totalPrice = Dollar(try Json.asString(Json.require(m, "totalPrice"), "totalPrice"))
        self.shippingAddress = Address(try Json.asString(Json.require(m, "shippingAddress"), "shippingAddress"))
        self.billingAddress = Address(try Json.asString(Json.require(m, "billingAddress"), "billingAddress"))
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ShoppingCartTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ShoppingCartTyped] {
        return try Json.parseArray(text).map {
            try ShoppingCartTyped(fromJSONValue: Json.asObject($0, "ShoppingCartTyped"))
        }
    }
}
