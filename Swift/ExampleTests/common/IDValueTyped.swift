public struct IDValueTyped {
    public let iD: IDForm
    public let value: Int

    public init(iD: IDForm, value: Int) {
        self.iD = iD
        self.value = value
    }

    public init(from s: IDValueString) {
        self.iD = IDForm(s.iD)
        self.value = Int(s.value) ?? 0
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "iD": String(describing: iD),
            "value": value,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.iD = IDForm(try Json.asString(Json.require(m, "iD"), "iD"))
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
}
