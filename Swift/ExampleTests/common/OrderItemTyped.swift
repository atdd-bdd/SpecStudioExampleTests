public struct OrderItemTyped: Equatable, CustomStringConvertible {
    public let name: SimpleTextTyped
    public let quantity: Int
    public let price: DollarTyped
    public let itemTotal: DollarTyped

    public init(name: SimpleTextTyped, quantity: Int, price: DollarTyped, itemTotal: DollarTyped) {
        self.name = name
        self.quantity = quantity
        self.price = price
        self.itemTotal = itemTotal
    }

    public init(from s: OrderItemString) {
        self.name = SimpleTextTyped(from: s.name)
        self.quantity = Int(s.quantity) ?? 0
        self.price = DollarTyped(from: s.price)
        self.itemTotal = DollarTyped(from: s.itemTotal)
    }

    public func toStringStruct() -> OrderItemString {
        return OrderItemString(
            name: name.toSimpleTextString(),
            quantity: String(describing: quantity),
            price: price.toDollarString(),
            itemTotal: itemTotal.toDollarString()
        )
    }

    public static func toStringList(_ list: [OrderItemTyped]) -> [OrderItemString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [OrderItemString]) -> [OrderItemTyped] {
        return list.map { OrderItemTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "name": name.text,
            "quantity": quantity,
            "price": price.text,
            "itemTotal": itemTotal.text,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.name = SimpleTextTyped(try Json.asString(Json.require(m, "name"), "name"))
        self.quantity = try Json.asInt(Json.require(m, "quantity"), "quantity")
        self.price = DollarTyped(try Json.asString(Json.require(m, "price"), "price"))
        self.itemTotal = DollarTyped(try Json.asString(Json.require(m, "itemTotal"), "itemTotal"))
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
