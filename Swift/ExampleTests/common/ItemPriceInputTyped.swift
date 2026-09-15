public struct ItemPriceInputTyped: Equatable, CustomStringConvertible {
    public let totalItems: String

    public init(totalItems: String) {
        self.totalItems = totalItems
    }

    public init(from s: ItemPriceInputString) {
        self.totalItems = s.totalItems
    }

    public func toStringStruct() -> ItemPriceInputString {
        return ItemPriceInputString(
            totalItems: String(describing: totalItems)
        )
    }

    public static func toStringList(_ list: [ItemPriceInputTyped]) -> [ItemPriceInputString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [ItemPriceInputString]) -> [ItemPriceInputTyped] {
        return list.map { ItemPriceInputTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "totalItems": totalItems,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.totalItems = try Json.asString(Json.require(m, "totalItems"), "totalItems")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ItemPriceInputTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ItemPriceInputTyped] {
        return try Json.parseArray(text).map {
            try ItemPriceInputTyped(fromJSONValue: Json.asObject($0, "ItemPriceInputTyped"))
        }
    }

    public var description: String {
        return "TotalItems=\(totalItems)"
    }
}
