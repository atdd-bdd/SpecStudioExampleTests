public struct ResponseTyped: Equatable, CustomStringConvertible {
    public let result: ResultTyped

    public init(result: ResultTyped) {
        self.result = result
    }

    public init(from s: ResponseString) {
        self.result = ResultTyped(from: s.result)
    }

    public func toStringStruct() -> ResponseString {
        return ResponseString(
            result: result.toStringStruct()
        )
    }

    public static func toStringList(_ list: [ResponseTyped]) -> [ResponseString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [ResponseString]) -> [ResponseTyped] {
        return list.map { ResponseTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "result": result.toJSONValue(),
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.result = try ResultTyped(fromJSONValue: Json.asObject(Json.require(m, "result"), "result"))
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ResponseTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ResponseTyped] {
        return try Json.parseArray(text).map {
            try ResponseTyped(fromJSONValue: Json.asObject($0, "ResponseTyped"))
        }
    }

    public var description: String {
        return "result=\(result)"
    }
}
