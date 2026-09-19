public struct PostTyped: Equatable, CustomStringConvertible {
    public let userId: Int
    public let id: Int
    public let title: String
    public let body: String

    public init(userId: Int, id: Int, title: String, body: String) {
        self.userId = userId
        self.id = id
        self.title = title
        self.body = body
    }

    public init(from s: PostString) {
        self.userId = Int(s.userId) ?? 0
        self.id = Int(s.id) ?? 0
        self.title = s.title
        self.body = s.body
    }

    public func toStringStruct() -> PostString {
        return PostString(
            userId: String(describing: userId),
            id: String(describing: id),
            title: String(describing: title),
            body: String(describing: body)
        )
    }

    public static func toStringList(_ list: [PostTyped]) -> [PostString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [PostString]) -> [PostTyped] {
        return list.map { PostTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "userId": userId,
            "id": id,
            "title": title,
            "body": body,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.userId = try Json.asInt(Json.require(m, "userId"), "userId")
        self.id = try Json.asInt(Json.require(m, "id"), "id")
        self.title = try Json.asString(Json.require(m, "title"), "title")
        self.body = try Json.asString(Json.require(m, "body"), "body")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [PostTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [PostTyped] {
        return try Json.parseArray(text).map {
            try PostTyped(fromJSONValue: Json.asObject($0, "PostTyped"))
        }
    }

    public var description: String {
        return "userId=\(userId), id=\(id), title=\(title), body=\(body)"
    }
}
