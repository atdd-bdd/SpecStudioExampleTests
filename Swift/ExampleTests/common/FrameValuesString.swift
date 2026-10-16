public struct FrameValuesString: CustomStringConvertible, Equatable {
    public let frame: String
    public let roll1: PinsString
    public let roll2: PinsString
    public let roll3: PinsString
    public let score: ScoreString
    public let totalScore: ScoreString

    public init(frame: String, roll1: PinsString, roll2: PinsString, roll3: PinsString, score: ScoreString, totalScore: ScoreString) {
        self.frame = frame
        self.roll1 = roll1
        self.roll2 = roll2
        self.roll3 = roll3
        self.score = score
        self.totalScore = totalScore
    }

    public init(fromArray v: [String]) {
        self.frame = v.count > 0 ? v[0] : ""
        self.roll1 = PinsString(v.count > 1 ? v[1] : "")
        self.roll2 = PinsString(v.count > 2 ? v[2] : "")
        self.roll3 = PinsString(v.count > 3 ? v[3] : "")
        self.score = ScoreString(v.count > 4 ? v[4] : "")
        self.totalScore = ScoreString(v.count > 5 ? v[5] : "")
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> FrameValuesString {
        let parts = Tokens.require(text, 6, "FrameValues")
        return FrameValuesString(frame: parts[0], roll1: PinsString(parts[1]), roll2: PinsString(parts[2]), roll3: PinsString(parts[3]), score: ScoreString(parts[4]), totalScore: ScoreString(parts[5]))
    }

    public var description: String {
        return Tokens.token(frame) + " " + Tokens.token(roll1.value) + " " + Tokens.token(roll2.value) + " " + Tokens.token(roll3.value) + " " + Tokens.token(score.value) + " " + Tokens.token(totalScore.value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: FrameValuesString, b: FrameValuesString) -> Bool {
        return (a.frame == dncString || b.frame == dncString || a.frame == b.frame)
            && a.roll1 == b.roll1
            && a.roll2 == b.roll2
            && a.roll3 == b.roll3
            && a.score == b.score
            && a.totalScore == b.totalScore
    }
}
