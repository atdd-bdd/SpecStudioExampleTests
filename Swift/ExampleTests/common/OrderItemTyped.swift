public struct OrderItemTyped: Equatable, CustomStringConvertible {
    public let name: String
    public let quantity: Int
    public let price: String
    public let itemTotal: String

    public init(name: String, quantity: Int, price: String, itemTotal: String) {
        self.name = name
        self.quantity = quantity
        self.price = price
        self.itemTotal = itemTotal
    }

    public init(from s: OrderItemString) {
        self.name = s.name
        self.quantity = Int(s.quantity) ?? 0
        self.price = s.price
        self.itemTotal = s.itemTotal
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "name": name,
            "quantity": quantity,
            "price": price,
            "itemTotal": itemTotal,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.name = try Json.asString(Json.require(m, "name"), "name")
        self.quantity = try Json.asInt(Json.require(m, "quantity"), "quantity")
        self.price = try Json.asString(Json.require(m, "price"), "price")
        self.itemTotal = try Json.asString(Json.require(m, "itemTotal"), "itemTotal")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [OrderItemTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [OrderItemTyped] {
        return try Json.parseArray(text).map {
            try OrderItemTyped(fromJSONValue: Json.asObject($0, "OrderItemTyped"))
        }
    }

    public var description: String {
        return "Name=\(name), Quantity=\(quantity), Price=\(price), ItemTotal=\(itemTotal)"
    }
}
