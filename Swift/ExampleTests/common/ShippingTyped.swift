public struct ShippingTyped {
    public let totalPrice: Dollar
    public let shippingCost: Dollar
    public let notes: String

    public init(totalPrice: Dollar, shippingCost: Dollar, notes: String) {
        self.totalPrice = totalPrice
        self.shippingCost = shippingCost
        self.notes = notes
    }

    public init(from s: ShippingString) {
        self.totalPrice = Dollar(s.totalPrice)
        self.shippingCost = Dollar(s.shippingCost)
        self.notes = s.notes
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalPrice": String(describing: totalPrice),
            "shippingCost": String(describing: shippingCost),
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalPrice = Dollar(try Json.asString(Json.require(m, "totalPrice"), "totalPrice"))
        self.shippingCost = Dollar(try Json.asString(Json.require(m, "shippingCost"), "shippingCost"))
        self.notes = try Json.asString(Json.require(m, "notes"), "notes")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ShippingTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ShippingTyped] {
        return try Json.parseArray(text).map {
            try ShippingTyped(fromJSONValue: Json.asObject($0, "ShippingTyped"))
        }
    }
}
