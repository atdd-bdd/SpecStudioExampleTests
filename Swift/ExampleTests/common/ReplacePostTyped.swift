public struct ReplacePostTyped: Equatable, CustomStringConvertible {
    public let id: Int
    public let userId: Int
    public let title: String
    public let body: String

    public init(id: Int, userId: Int, title: String, body: String) {
        self.id = id
        self.userId = userId
        self.title = title
        self.body = body
    }

    public init(from s: ReplacePostString) {
        self.id = Int(s.id) ?? 0
        self.userId = Int(s.userId) ?? 0
        self.title = s.title
        self.body = s.body
    }

    public func toStringStruct() -> ReplacePostString {
        return ReplacePostString(
            id: String(describing: id),
            userId: String(describing: userId),
            title: String(describing: title),
            body: String(describing: body)
        )
    }

    public static func toStringList(_ list: [ReplacePostTyped]) -> [ReplacePostString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [ReplacePostString]) -> [ReplacePostTyped] {
        return list.map { ReplacePostTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "id": id,
            "userId": userId,
            "title": title,
            "body": body,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.id = try Json.asInt(Json.require(m, "id"), "id")
        self.userId = try Json.asInt(Json.require(m, "userId"), "userId")
        self.title = try Json.asString(Json.require(m, "title"), "title")
        self.body = try Json.asString(Json.require(m, "body"), "body")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ReplacePostTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ReplacePostTyped] {
        return try Json.parseArray(text).map {
            try ReplacePostTyped(fromJSONValue: Json.asObject($0, "ReplacePostTyped"))
        }
    }

    public var description: String {
        return "id=\(id), userId=\(userId), title=\(title), body=\(body)"
    }
}
