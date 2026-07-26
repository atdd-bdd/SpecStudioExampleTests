public struct OrderItemTyped {
    public let name: SimpleText
    public let quantity: Int
    public let price: Dollar
    public let itemTotal: Dollar

    public init(name: SimpleText, quantity: Int, price: Dollar, itemTotal: Dollar) {
        self.name = name
        self.quantity = quantity
        self.price = price
        self.itemTotal = itemTotal
    }

    public init(from s: OrderItemString) {
        self.name = SimpleText(s.name)
        self.quantity = Int(s.quantity) ?? 0
        self.price = Dollar(s.price)
        self.itemTotal = Dollar(s.itemTotal)
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "name": String(describing: name),
            "quantity": quantity,
            "price": String(describing: price),
            "itemTotal": String(describing: itemTotal),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.name = SimpleText(try Json.asString(Json.require(m, "name"), "name"))
        self.quantity = try Json.asInt(Json.require(m, "quantity"), "quantity")
        self.price = Dollar(try Json.asString(Json.require(m, "price"), "price"))
        self.itemTotal = Dollar(try Json.asString(Json.require(m, "itemTotal"), "itemTotal"))
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
}
