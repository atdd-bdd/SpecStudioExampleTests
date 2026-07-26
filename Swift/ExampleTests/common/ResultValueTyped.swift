public struct ResultValueTyped {
    public let sum: Int

    public init(sum: Int) {
        self.sum = sum
    }

    public init(from s: ResultValueString) {
        self.sum = Int(s.sum) ?? 0
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "sum": sum,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.sum = try Json.asInt(Json.require(m, "sum"), "sum")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ResultValueTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ResultValueTyped] {
        return try Json.parseArray(text).map {
            try ResultValueTyped(fromJSONValue: Json.asObject($0, "ResultValueTyped"))
        }
    }
}
