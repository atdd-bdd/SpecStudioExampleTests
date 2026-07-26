public struct CatalogItemTyped: Equatable, CustomStringConvertible {
    public let name: String
    public let price: String

    public init(name: String, price: String) {
        self.name = name
        self.price = price
    }

    public init(from s: CatalogItemString) {
        self.name = s.name
        self.price = s.price
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "name": name,
            "price": price,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.name = try Json.asString(Json.require(m, "name"), "name")
        self.price = try Json.asString(Json.require(m, "price"), "price")
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
