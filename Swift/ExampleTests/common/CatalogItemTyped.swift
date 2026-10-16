public struct CatalogItemTyped: Equatable, CustomStringConvertible {
    public let name: SimpleTextTyped
    public let price: DollarTyped

    public init(name: SimpleTextTyped, price: DollarTyped) {
        self.name = name
        self.price = price
    }

    public init(from s: CatalogItemString) {
        self.name = SimpleTextTyped(from: s.name)
        self.price = DollarTyped(from: s.price)
    }

    public func toStringStruct() -> CatalogItemString {
        return CatalogItemString(
            name: name.toSimpleTextString(),
            price: price.toDollarString()
        )
    }

    public static func toStringList(_ list: [CatalogItemTyped]) -> [CatalogItemString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [CatalogItemString]) -> [CatalogItemTyped] {
        return list.map { CatalogItemTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "name": name.text,
            "price": price.text,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.name = SimpleTextTyped(try Json.asString(Json.require(m, "name"), "name"))
        self.price = DollarTyped(try Json.asString(Json.require(m, "price"), "price"))
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

    public var description: String {
        return "Name=\(name), Price=\(price)"
    }
}
