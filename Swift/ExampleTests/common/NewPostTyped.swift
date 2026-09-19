public struct NewPostTyped: Equatable, CustomStringConvertible {
    public let title: String
    public let body: String
    public let userId: Int

    public init(title: String, body: String, userId: Int) {
        self.title = title
        self.body = body
        self.userId = userId
    }

    public init(from s: NewPostString) {
        self.title = s.title
        self.body = s.body
        self.userId = Int(s.userId) ?? 0
    }

    public func toStringStruct() -> NewPostString {
        return NewPostString(
            title: String(describing: title),
            body: String(describing: body),
            userId: String(describing: userId)
        )
    }

    public static func toStringList(_ list: [NewPostTyped]) -> [NewPostString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [NewPostString]) -> [NewPostTyped] {
        return list.map { NewPostTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "title": title,
            "body": body,
            "userId": userId,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.title = try Json.asString(Json.require(m, "title"), "title")
        self.body = try Json.asString(Json.require(m, "body"), "body")
        self.userId = try Json.asInt(Json.require(m, "userId"), "userId")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [NewPostTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [NewPostTyped] {
        return try Json.parseArray(text).map {
            try NewPostTyped(fromJSONValue: Json.asObject($0, "NewPostTyped"))
        }
    }

    public var description: String {
        return "title=\(title), body=\(body), userId=\(userId)"
    }
}
