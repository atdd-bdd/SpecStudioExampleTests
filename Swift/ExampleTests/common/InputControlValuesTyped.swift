public struct InputControlValuesTyped: Equatable, CustomStringConvertible {
    public let frame: Int
    public let roll: String
    public let remaining: String

    public init(frame: Int, roll: String, remaining: String) {
        self.frame = frame
        self.roll = roll
        self.remaining = remaining
    }

    public init(from s: InputControlValuesString) {
        self.frame = Int(s.frame) ?? 0
        self.roll = s.roll
        self.remaining = s.remaining
    }

    public func toStringStruct() -> InputControlValuesString {
        return InputControlValuesString(
            frame: String(describing: frame),
            roll: String(describing: roll),
            remaining: String(describing: remaining)
        )
    }

    public static func toStringList(_ list: [InputControlValuesTyped]) -> [InputControlValuesString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [InputControlValuesString]) -> [InputControlValuesTyped] {
        return list.map { InputControlValuesTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "frame": frame,
            "roll": roll,
            "remaining": remaining,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.frame = try Json.asInt(Json.require(m, "frame"), "frame")
        self.roll = try Json.asString(Json.require(m, "roll"), "roll")
        self.remaining = try Json.asString(Json.require(m, "remaining"), "remaining")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [InputControlValuesTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [InputControlValuesTyped] {
        return try Json.parseArray(text).map {
            try InputControlValuesTyped(fromJSONValue: Json.asObject($0, "InputControlValuesTyped"))
        }
    }

    public var description: String {
        return "Frame=\(frame), Roll=\(roll), Remaining=\(remaining)"
    }
}
