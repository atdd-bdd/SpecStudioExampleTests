public struct PricingTyped {
    public let totalPrice: Dollar

    public init(totalPrice: Dollar) {
        self.totalPrice = totalPrice
    }

    public init(from s: PricingString) {
        self.totalPrice = Dollar(s.totalPrice)
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalPrice": String(describing: totalPrice),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalPrice = Dollar(try Json.asString(Json.require(m, "totalPrice"), "totalPrice"))
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [PricingTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [PricingTyped] {
        return try Json.parseArray(text).map {
            try PricingTyped(fromJSONValue: Json.asObject($0, "PricingTyped"))
        }
    }
}
