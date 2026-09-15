public struct FilterValueTyped: Equatable, CustomStringConvertible {
    public let value: String

    public init(value: String) {
        self.value = value
    }

    public init(from s: FilterValueString) {
        self.value = s.value
    }

    public func toStringStruct() -> FilterValueString {
        return FilterValueString(
            value: String(describing: value)
        )
    }

    public static func toStringList(_ list: [FilterValueTyped]) -> [FilterValueString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [FilterValueString]) -> [FilterValueTyped] {
        return list.map { FilterValueTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "value": value,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.value = try Json.asString(Json.require(m, "value"), "value")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [FilterValueTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [FilterValueTyped] {
        return try Json.parseArray(text).map {
            try FilterValueTyped(fromJSONValue: Json.asObject($0, "FilterValueTyped"))
        }
    }

    public var description: String {
        return "Value=\(value)"
    }
}
