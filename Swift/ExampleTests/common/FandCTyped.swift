public struct FandCTyped: Equatable, CustomStringConvertible {
    public let f: Int
    public let c: Int
    public let notes: String

    public init(f: Int, c: Int, notes: String) {
        self.f = f
        self.c = c
        self.notes = notes
    }

    public init(from s: FandCString) {
        self.f = Int(s.f) ?? 0
        self.c = Int(s.c) ?? 0
        self.notes = s.notes
    }

    public func toStringStruct() -> FandCString {
        return FandCString(
            f: String(describing: f),
            c: String(describing: c),
            notes: String(describing: notes)
        )
    }

    public static func toStringList(_ list: [FandCTyped]) -> [FandCString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [FandCString]) -> [FandCTyped] {
        return list.map { FandCTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "f": f,
            "c": c,
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.f = try Json.asInt(Json.require(m, "f"), "f")
        self.c = try Json.asInt(Json.require(m, "c"), "c")
        self.notes = try Json.asString(Json.require(m, "notes"), "notes")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [FandCTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [FandCTyped] {
        return try Json.parseArray(text).map {
            try FandCTyped(fromJSONValue: Json.asObject($0, "FandCTyped"))
        }
    }

    public var description: String {
        return "F=\(f), C=\(c), Notes=\(notes)"
    }
}
