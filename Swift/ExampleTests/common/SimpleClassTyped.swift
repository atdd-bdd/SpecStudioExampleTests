public struct SimpleClassTyped: Equatable, CustomStringConvertible {
    public let anInt: Int
    public let aString: String

    public init(anInt: Int, aString: String) {
        self.anInt = anInt
        self.aString = aString
    }

    public init(from s: SimpleClassString) {
        self.anInt = Int(s.anInt) ?? 0
        self.aString = s.aString
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "anInt": anInt,
            "aString": aString,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.anInt = try Json.asInt(Json.require(m, "anInt"), "anInt")
        self.aString = try Json.asString(Json.require(m, "aString"), "aString")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [SimpleClassTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [SimpleClassTyped] {
        return try Json.parseArray(text).map {
            try SimpleClassTyped(fromJSONValue: Json.asObject($0, "SimpleClassTyped"))
        }
    }

    public var description: String {
        return "anInt=\(anInt), aString=\(aString)"
    }
}
