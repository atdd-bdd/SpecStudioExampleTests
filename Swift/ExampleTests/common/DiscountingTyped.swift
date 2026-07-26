public struct DiscountingTyped {
    public let totalPrice: Dollar
    public let discount: Percentage
    public let notes: String

    public init(totalPrice: Dollar, discount: Percentage, notes: String) {
        self.totalPrice = totalPrice
        self.discount = discount
        self.notes = notes
    }

    public init(from s: DiscountingString) {
        self.totalPrice = Dollar(s.totalPrice)
        self.discount = Percentage(s.discount)
        self.notes = s.notes
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalPrice": String(describing: totalPrice),
            "discount": String(describing: discount),
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalPrice = Dollar(try Json.asString(Json.require(m, "totalPrice"), "totalPrice"))
        self.discount = Percentage(try Json.asString(Json.require(m, "discount"), "discount"))
        self.notes = try Json.asString(Json.require(m, "notes"), "notes")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [DiscountingTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [DiscountingTyped] {
        return try Json.parseArray(text).map {
            try DiscountingTyped(fromJSONValue: Json.asObject($0, "DiscountingTyped"))
        }
    }
}
