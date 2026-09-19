public struct PatchTitleTyped: Equatable, CustomStringConvertible {
    public let title: String

    public init(title: String) {
        self.title = title
    }

    public init(from s: PatchTitleString) {
        self.title = s.title
    }

    public func toStringStruct() -> PatchTitleString {
        return PatchTitleString(
            title: String(describing: title)
        )
    }

    public static func toStringList(_ list: [PatchTitleTyped]) -> [PatchTitleString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [PatchTitleString]) -> [PatchTitleTyped] {
        return list.map { PatchTitleTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "title": title,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.title = try Json.asString(Json.require(m, "title"), "title")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [PatchTitleTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [PatchTitleTyped] {
        return try Json.parseArray(text).map {
            try PatchTitleTyped(fromJSONValue: Json.asObject($0, "PatchTitleTyped"))
        }
    }

    public var description: String {
        return "title=\(title)"
    }
}
