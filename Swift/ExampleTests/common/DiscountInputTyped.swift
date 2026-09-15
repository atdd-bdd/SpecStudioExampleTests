public struct DiscountInputTyped: Equatable, CustomStringConvertible {
    public let totalPrice: String
    public let discount: String
    public let notes: String

    public init(totalPrice: String, discount: String, notes: String) {
        self.totalPrice = totalPrice
        self.discount = discount
        self.notes = notes
    }

    public init(from s: DiscountInputString) {
        self.totalPrice = s.totalPrice
        self.discount = s.discount
        self.notes = s.notes
    }

    public func toStringStruct() -> DiscountInputString {
        return DiscountInputString(
            totalPrice: String(describing: totalPrice),
            discount: String(describing: discount),
            notes: String(describing: notes)
        )
    }

    public static func toStringList(_ list: [DiscountInputTyped]) -> [DiscountInputString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [DiscountInputString]) -> [DiscountInputTyped] {
        return list.map { DiscountInputTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalPrice": totalPrice,
            "discount": discount,
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalPrice = try Json.asString(Json.require(m, "totalPrice"), "totalPrice")
        self.discount = try Json.asString(Json.require(m, "discount"), "discount")
        self.notes = try Json.asString(Json.require(m, "notes"), "notes")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [DiscountInputTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [DiscountInputTyped] {
        return try Json.parseArray(text).map {
            try DiscountInputTyped(fromJSONValue: Json.asObject($0, "DiscountInputTyped"))
        }
    }

    public var description: String {
        return "Total Price=\(totalPrice), Discount=\(discount), Notes=\(notes)"
    }
}
