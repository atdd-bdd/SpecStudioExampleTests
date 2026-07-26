public struct ShoppingCartTyped: Equatable, CustomStringConvertible {
    public let items: String
    public let shipping: String
    public let discount: String
    public let totalPrice: String
    public let shippingAddress: AddressTyped
    public let billingAddress: AddressTyped

    public init(items: String, shipping: String, discount: String, totalPrice: String, shippingAddress: AddressTyped, billingAddress: AddressTyped) {
        self.items = items
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.shippingAddress = shippingAddress
        self.billingAddress = billingAddress
    }

    public init(from s: ShoppingCartString) {
        self.items = s.items
        self.shipping = s.shipping
        self.discount = s.discount
        self.totalPrice = s.totalPrice
        self.shippingAddress = AddressTyped(from: s.shippingAddress)
        self.billingAddress = AddressTyped(from: s.billingAddress)
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "items": items,
            "shipping": shipping,
            "discount": discount,
            "totalPrice": totalPrice,
            "shippingAddress": shippingAddress.toJSONValue(),
            "billingAddress": billingAddress.toJSONValue(),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.items = try Json.asString(Json.require(m, "items"), "items")
        self.shipping = try Json.asString(Json.require(m, "shipping"), "shipping")
        self.discount = try Json.asString(Json.require(m, "discount"), "discount")
        self.totalPrice = try Json.asString(Json.require(m, "totalPrice"), "totalPrice")
        self.shippingAddress = try AddressTyped(fromJSONValue: Json.asObject(Json.require(m, "shippingAddress"), "shippingAddress"))
        self.billingAddress = try AddressTyped(fromJSONValue: Json.asObject(Json.require(m, "billingAddress"), "billingAddress"))
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

    public var description: String {
        return "Items=\(items), Shipping=\(shipping), Discount=\(discount), TotalPrice=\(totalPrice), ShippingAddress=\(shippingAddress), BillingAddress=\(billingAddress)"
    }
}
