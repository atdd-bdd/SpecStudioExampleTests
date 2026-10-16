public struct InputControlValuesTyped: Equatable, CustomStringConvertible {
    public let frame: Int
    public let roll: PinsTyped
    public let remaining: PinsTyped

    public init(frame: Int, roll: PinsTyped, remaining: PinsTyped) {
        self.frame = frame
        self.roll = roll
        self.remaining = remaining
    }

    public init(from s: InputControlValuesString) {
        self.frame = Int(s.frame) ?? 0
        self.roll = PinsTyped(from: s.roll)
        self.remaining = PinsTyped(from: s.remaining)
    }

    public func toStringStruct() -> InputControlValuesString {
        return InputControlValuesString(
            frame: String(describing: frame),
            roll: roll.toPinsString(),
            remaining: remaining.toPinsString()
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
            "roll": roll.text,
            "remaining": remaining.text,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.frame = try Json.asInt(Json.require(m, "frame"), "frame")
        self.roll = PinsTyped(try Json.asString(Json.require(m, "roll"), "roll"))
        self.remaining = PinsTyped(try Json.asString(Json.require(m, "remaining"), "remaining"))
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
