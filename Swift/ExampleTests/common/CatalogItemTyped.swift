public struct CatalogItemTyped {
    public let name: SimpleText
    public let price: Dollar

    public init(name: SimpleText, price: Dollar) {
        self.name = name
        self.price = price
    }

    public init(from s: CatalogItemString) {
        self.name = SimpleText(s.name)
        self.price = Dollar(s.price)
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "name": String(describing: name),
            "price": String(describing: price),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.name = SimpleText(try Json.asString(Json.require(m, "name"), "name"))
        self.price = Dollar(try Json.asString(Json.require(m, "price"), "price"))
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [CatalogItemTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [CatalogItemTyped] {
        return try Json.parseArray(text).map {
            try CatalogItemTyped(fromJSONValue: Json.asObject($0, "CatalogItemTyped"))
        }
    }
}
