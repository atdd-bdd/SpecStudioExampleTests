public struct FrameValuesTyped: Equatable, CustomStringConvertible {
    public let frame: Int
    public let roll1: String
    public let roll2: String
    public let roll3: String
    public let score: String
    public let totalScore: String

    public init(frame: Int, roll1: String, roll2: String, roll3: String, score: String, totalScore: String) {
        self.frame = frame
        self.roll1 = roll1
        self.roll2 = roll2
        self.roll3 = roll3
        self.score = score
        self.totalScore = totalScore
    }

    public init(from s: FrameValuesString) {
        self.frame = Int(s.frame) ?? 0
        self.roll1 = s.roll1
        self.roll2 = s.roll2
        self.roll3 = s.roll3
        self.score = s.score
        self.totalScore = s.totalScore
    }

    public func toStringStruct() -> FrameValuesString {
        return FrameValuesString(
            frame: String(describing: frame),
            roll1: String(describing: roll1),
            roll2: String(describing: roll2),
            roll3: String(describing: roll3),
            score: String(describing: score),
            totalScore: String(describing: totalScore)
        )
    }

    public static func toStringList(_ list: [FrameValuesTyped]) -> [FrameValuesString] {
        return list.map { $0.toStringStruct() }
    }

    public static func fromStringList(_ list: [FrameValuesString]) -> [FrameValuesTyped] {
        return list.map { FrameValuesTyped(from: $0) }
    }

    public func toJSONValue() -> [String: Any] {
        return [
            "frame": frame,
            "roll1": roll1,
            "roll2": roll2,
            "roll3": roll3,
            "score": score,
            "totalScore": totalScore,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.frame = try Json.asInt(Json.require(m, "frame"), "frame")
        self.roll1 = try Json.asString(Json.require(m, "roll1"), "roll1")
        self.roll2 = try Json.asString(Json.require(m, "roll2"), "roll2")
        self.roll3 = try Json.asString(Json.require(m, "roll3"), "roll3")
        self.score = try Json.asString(Json.require(m, "score"), "score")
        self.totalScore = try Json.asString(Json.require(m, "totalScore"), "totalScore")
    }

    public init(fromJSON text: String) throws {
        try self.init(fromJSONValue: Json.parseObject(text))
    }

    public static func toJSONList(_ list: [FrameValuesTyped]) throws -> String {
        return try Json.write(list.map { $0.toJSONValue() })
    }

    public static func fromJSONList(_ text: String) throws -> [FrameValuesTyped] {
        return try Json.parseArray(text).map {
            try FrameValuesTyped(fromJSONValue: Json.asObject($0, "FrameValuesTyped"))
        }
    }

    public var description: String {
        return "Frame=\(frame), Roll1=\(roll1), Roll2=\(roll2), Roll3=\(roll3), Score=\(score), TotalScore=\(totalScore)"
    }
}
