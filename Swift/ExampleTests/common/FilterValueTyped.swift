public struct FilterValueTyped {
    public let value: IDForm

    public init(value: IDForm) {
        self.value = value
    }

    public init(from s: FilterValueString) {
        self.value = IDForm(s.value)
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "value": String(describing: value),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.value = IDForm(try Json.asString(Json.require(m, "value"), "value"))
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
}
