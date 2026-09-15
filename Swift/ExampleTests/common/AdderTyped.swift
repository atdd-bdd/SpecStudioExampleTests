public struct AdderTyped: Equatable, CustomStringConvertible {
    public let number1: Int
    public let number2: Int
    public let result: Int

    public init(number1: Int, number2: Int, result: Int) {
        self.number1 = number1
        self.number2 = number2
        self.result = result
    }

    public init(from s: AdderString) {
        self.number1 = Int(s.number1) ?? 0
        self.number2 = Int(s.number2) ?? 0
        self.result = Int(s.result) ?? 0
    }

    public func toStringStruct() -> AdderString {
        return AdderString(
            number1: String(describing: number1),
            number2: String(describing: number2),
            result: String(describing: result)
        )
    }

    public static func toStringList(_ list: [AdderTyped]) -> [AdderString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [AdderString]) -> [AdderTyped] {
        return list.map { AdderTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "number1": number1,
            "number2": number2,
            "result": result,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.number1 = try Json.asInt(Json.require(m, "number1"), "number1")
        self.number2 = try Json.asInt(Json.require(m, "number2"), "number2")
        self.result = try Json.asInt(Json.require(m, "result"), "result")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [AdderTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [AdderTyped] {
        return try Json.parseArray(text).map {
            try AdderTyped(fromJSONValue: Json.asObject($0, "AdderTyped"))
        }
    }

    public var description: String {
        return "number1=\(number1), number2=\(number2), result=\(result)"
    }
}
