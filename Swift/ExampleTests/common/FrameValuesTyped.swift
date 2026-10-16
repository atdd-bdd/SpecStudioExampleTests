public struct FrameValuesTyped: Equatable, CustomStringConvertible {
    public let frame: Int
    public let roll1: PinsTyped
    public let roll2: PinsTyped
    public let roll3: PinsTyped
    public let score: ScoreTyped
    public let totalScore: ScoreTyped

    public init(frame: Int, roll1: PinsTyped, roll2: PinsTyped, roll3: PinsTyped, score: ScoreTyped, totalScore: ScoreTyped) {
        self.frame = frame
        self.roll1 = roll1
        self.roll2 = roll2
        self.roll3 = roll3
        self.score = score
        self.totalScore = totalScore
    }

    public init(from s: FrameValuesString) {
        self.frame = Int(s.frame) ?? 0
        self.roll1 = PinsTyped(from: s.roll1)
        self.roll2 = PinsTyped(from: s.roll2)
        self.roll3 = PinsTyped(from: s.roll3)
        self.score = ScoreTyped(from: s.score)
        self.totalScore = ScoreTyped(from: s.totalScore)
    }

    public func toStringStruct() -> FrameValuesString {
        return FrameValuesString(
            frame: String(describing: frame),
            roll1: roll1.toPinsString(),
            roll2: roll2.toPinsString(),
            roll3: roll3.toPinsString(),
            score: score.toScoreString(),
            totalScore: totalScore.toScoreString()
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
            "roll1": roll1.text,
            "roll2": roll2.text,
            "roll3": roll3.text,
            "score": score.text,
            "totalScore": totalScore.text,
        ]
    }

    public func toJSON() throws -> String {
        return try Json.write(toJSONValue())
    }

    public init(fromJSONValue m: [String: Any]) throws {
        self.frame = try Json.asInt(Json.require(m, "frame"), "frame")
        self.roll1 = PinsTyped(try Json.asString(Json.require(m, "roll1"), "roll1"))
        self.roll2 = PinsTyped(try Json.asString(Json.require(m, "roll2"), "roll2"))
        self.roll3 = PinsTyped(try Json.asString(Json.require(m, "roll3"), "roll3"))
        self.score = ScoreTyped(try Json.asString(Json.require(m, "score"), "score"))
        self.totalScore = ScoreTyped(try Json.asString(Json.require(m, "totalScore"), "totalScore"))
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
