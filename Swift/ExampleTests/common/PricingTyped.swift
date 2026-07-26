public struct PricingTyped: Equatable, CustomStringConvertible {
    public let totalPrice: String

    public init(totalPrice: String) {
        self.totalPrice = totalPrice
    }

    public init(from s: PricingString) {
        self.totalPrice = s.totalPrice
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalPrice": totalPrice,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalPrice = try Json.asString(Json.require(m, "totalPrice"), "totalPrice")
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

    public var description: String {
        return "TotalPrice=\(totalPrice)"
    }
}
