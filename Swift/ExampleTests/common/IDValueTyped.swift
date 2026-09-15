public struct IDValueTyped: Equatable, CustomStringConvertible {
    public let iD: String
    public let value: Int

    public init(iD: String, value: Int) {
        self.iD = iD
        self.value = value
    }

    public init(from s: IDValueString) {
        self.iD = s.iD
        self.value = Int(s.value) ?? 0
    }

    public func toStringStruct() -> IDValueString {
        return IDValueString(
            iD: String(describing: iD),
            value: String(describing: value)
        )
    }

    public static func toStringList(_ list: [IDValueTyped]) -> [IDValueString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [IDValueString]) -> [IDValueTyped] {
        return list.map { IDValueTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "iD": iD,
            "value": value,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.iD = try Json.asString(Json.require(m, "iD"), "iD")
        self.value = try Json.asInt(Json.require(m, "value"), "value")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [IDValueTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [IDValueTyped] {
        return try Json.parseArray(text).map {
            try IDValueTyped(fromJSONValue: Json.asObject($0, "IDValueTyped"))
        }
    }

    public var description: String {
        return "ID=\(iD), Value=\(value)"
    }
}
