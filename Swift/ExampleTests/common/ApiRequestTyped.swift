public struct ApiRequestTyped: Equatable, CustomStringConvertible {
    public let method: String
    public let page: String
    public let parameter: String
    public let body: String

    public init(method: String, page: String, parameter: String, body: String) {
        self.method = method
        self.page = page
        self.parameter = parameter
        self.body = body
    }

    public init(from s: ApiRequestString) {
        self.method = s.method
        self.page = s.page
        self.parameter = s.parameter
        self.body = s.body
    }

    public func toStringStruct() -> ApiRequestString {
        return ApiRequestString(
            method: String(describing: method),
            page: String(describing: page),
            parameter: String(describing: parameter),
            body: String(describing: body)
        )
    }

    public static func toStringList(_ list: [ApiRequestTyped]) -> [ApiRequestString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [ApiRequestString]) -> [ApiRequestTyped] {
        return list.map { ApiRequestTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "method": method,
            "page": page,
            "parameter": parameter,
            "body": body,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.method = try Json.asString(Json.require(m, "method"), "method")
        self.page = try Json.asString(Json.require(m, "page"), "page")
        self.parameter = try Json.asString(Json.require(m, "parameter"), "parameter")
        self.body = try Json.asString(Json.require(m, "body"), "body")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ApiRequestTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ApiRequestTyped] {
        return try Json.parseArray(text).map {
            try ApiRequestTyped(fromJSONValue: Json.asObject($0, "ApiRequestTyped"))
        }
    }

    public var description: String {
        return "Method=\(method), Page=\(page), Parameter=\(parameter), Body=\(body)"
    }
}
