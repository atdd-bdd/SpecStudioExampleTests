public struct ApiStatusTyped: Equatable, CustomStringConvertible {
    public let code: Int

    public init(code: Int) {
        self.code = code
    }

    public init(from s: ApiStatusString) {
        self.code = Int(s.code) ?? 0
    }

    public func toStringStruct() -> ApiStatusString {
        return ApiStatusString(
            code: String(describing: code)
        )
    }

    public static func toStringList(_ list: [ApiStatusTyped]) -> [ApiStatusString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [ApiStatusString]) -> [ApiStatusTyped] {
        return list.map { ApiStatusTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "code": code,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.code = try Json.asInt(Json.require(m, "code"), "code")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ApiStatusTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ApiStatusTyped] {
        return try Json.parseArray(text).map {
            try ApiStatusTyped(fromJSONValue: Json.asObject($0, "ApiStatusTyped"))
        }
    }

    public var description: String {
        return "Code=\(code)"
    }
}
