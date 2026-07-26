public struct ShippingInputTyped: Equatable, CustomStringConvertible {
    public let totalPrice: String
    public let shippingCost: String
    public let notes: String

    public init(totalPrice: String, shippingCost: String, notes: String) {
        self.totalPrice = totalPrice
        self.shippingCost = shippingCost
        self.notes = notes
    }

    public init(from s: ShippingInputString) {
        self.totalPrice = s.totalPrice
        self.shippingCost = s.shippingCost
        self.notes = s.notes
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalPrice": totalPrice,
            "shippingCost": shippingCost,
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalPrice = try Json.asString(Json.require(m, "totalPrice"), "totalPrice")
        self.shippingCost = try Json.asString(Json.require(m, "shippingCost"), "shippingCost")
        self.notes = try Json.asString(Json.require(m, "notes"), "notes")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ShippingInputTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ShippingInputTyped] {
        return try Json.parseArray(text).map {
            try ShippingInputTyped(fromJSONValue: Json.asObject($0, "ShippingInputTyped"))
        }
    }

    public var description: String {
        return "Total Price=\(totalPrice), Shipping Cost=\(shippingCost), Notes=\(notes)"
    }
}
