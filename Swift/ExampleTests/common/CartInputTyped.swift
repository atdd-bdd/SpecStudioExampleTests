public struct CartInputTyped: Equatable, CustomStringConvertible {
    public let totalItems: String
    public let shipping: String
    public let discount: String
    public let totalPrice: String
    public let notes: String

    public init(totalItems: String, shipping: String, discount: String, totalPrice: String, notes: String) {
        self.totalItems = totalItems
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.notes = notes
    }

    public init(from s: CartInputString) {
        self.totalItems = s.totalItems
        self.shipping = s.shipping
        self.discount = s.discount
        self.totalPrice = s.totalPrice
        self.notes = s.notes
    }

    public func toStringStruct() -> CartInputString {
        return CartInputString(
            totalItems: String(describing: totalItems),
            shipping: String(describing: shipping),
            discount: String(describing: discount),
            totalPrice: String(describing: totalPrice),
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
            "totalItems": totalItems,
            "shipping": shipping,
            "discount": discount,
            "totalPrice": totalPrice,
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalItems = try Json.asString(Json.require(m, "totalItems"), "totalItems")
        self.shipping = try Json.asString(Json.require(m, "shipping"), "shipping")
        self.discount = try Json.asString(Json.require(m, "discount"), "discount")
        self.totalPrice = try Json.asString(Json.require(m, "totalPrice"), "totalPrice")
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
