public struct CartInputTyped: Equatable, CustomStringConvertible {
    public let totalItems: DollarTyped
    public let shipping: DollarTyped
    public let discount: DollarTyped
    public let totalPrice: DollarTyped
    public let notes: String

    public init(totalItems: DollarTyped, shipping: DollarTyped, discount: DollarTyped, totalPrice: DollarTyped, notes: String) {
        self.totalItems = totalItems
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.notes = notes
    }

    public init(from s: CartInputString) {
        self.totalItems = DollarTyped(from: s.totalItems)
        self.shipping = DollarTyped(from: s.shipping)
        self.discount = DollarTyped(from: s.discount)
        self.totalPrice = DollarTyped(from: s.totalPrice)
        self.notes = s.notes
    }

    public func toStringStruct() -> CartInputString {
        return CartInputString(
            totalItems: totalItems.toDollarString(),
            shipping: shipping.toDollarString(),
            discount: discount.toDollarString(),
            totalPrice: totalPrice.toDollarString(),
            notes: String(describing: notes)
        )
    }

    public static func toStringList(_ list: [CartInputTyped]) -> [CartInputString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [CartInputString]) -> [CartInputTyped] {
        return list.map { CartInputTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalItems": totalItems.text,
            "shipping": shipping.text,
            "discount": discount.text,
            "totalPrice": totalPrice.text,
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalItems = DollarTyped(try Json.asString(Json.require(m, "totalItems"), "totalItems"))
        self.shipping = DollarTyped(try Json.asString(Json.require(m, "shipping"), "shipping"))
        self.discount = DollarTyped(try Json.asString(Json.require(m, "discount"), "discount"))
        self.totalPrice = DollarTyped(try Json.asString(Json.require(m, "totalPrice"), "totalPrice"))
        self.notes = try Json.asString(Json.require(m, "notes"), "notes")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [CartInputTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [CartInputTyped] {
        return try Json.parseArray(text).map {
            try CartInputTyped(fromJSONValue: Json.asObject($0, "CartInputTyped"))
        }
    }

    public var description: String {
        return "TotalItems=\(totalItems), Shipping=\(shipping), Discount=\(discount), Total Price=\(totalPrice), Notes=\(notes)"
    }
}
