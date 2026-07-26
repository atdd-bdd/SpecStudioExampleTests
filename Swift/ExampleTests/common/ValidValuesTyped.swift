public struct ValidValuesTyped: Equatable, CustomStringConvertible {
    public let value: String
    public let isValid: Bool
    public let notes: String

    public init(value: String, isValid: Bool, notes: String) {
        self.value = value
        self.isValid = isValid
        self.notes = notes
    }

    public init(from s: ValidValuesString) {
        self.value = s.value
        self.isValid = ["true", "t", "yes", "y", "1"].contains(s.isValid.lowercased())
        self.notes = s.notes
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "value": value,
            "isValid": isValid,
            "notes": notes,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.value = try Json.asString(Json.require(m, "value"), "value")
        self.isValid = try Json.asBool(Json.require(m, "isValid"), "isValid")
        self.notes = try Json.asString(Json.require(m, "notes"), "notes")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [ValidValuesTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [ValidValuesTyped] {
        return try Json.parseArray(text).map {
            try ValidValuesTyped(fromJSONValue: Json.asObject($0, "ValidValuesTyped"))
        }
    }

    public var description: String {
        return "Value=\(value), IsValid=\(isValid), Notes=\(notes)"
    }
}
