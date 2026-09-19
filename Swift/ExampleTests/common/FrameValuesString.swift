public struct FrameValuesString: CustomStringConvertible, Equatable {
    public let frame: String
    public let roll1: String
    public let roll2: String
    public let roll3: String
    public let score: String
    public let totalScore: String

    public init(frame: String, roll1: String, roll2: String, roll3: String, score: String, totalScore: String) {
        self.frame = frame
        self.roll1 = roll1
        self.roll2 = roll2
        self.roll3 = roll3
        self.score = score
        self.totalScore = totalScore
    }

    public init(fromArray v: [String]) {
        self.frame = v.count > 0 ? v[0] : ""
        self.roll1 = v.count > 1 ? v[1] : ""
        self.roll2 = v.count > 2 ? v[2] : ""
        self.roll3 = v.count > 3 ? v[3] : ""
        self.score = v.count > 4 ? v[4] : ""
        self.totalScore = v.count > 5 ? v[5] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> FrameValuesString {
        let parts = Tokens.require(text, 6, "FrameValues")
        return FrameValuesString(frame: parts[0], roll1: parts[1], roll2: parts[2], roll3: parts[3], score: parts[4], totalScore: parts[5])
    }

    public var description: String {
        return Tokens.token(frame) + " " + Tokens.token(roll1) + " " + Tokens.token(roll2) + " " + Tokens.token(roll3) + " " + Tokens.token(score) + " " + Tokens.token(totalScore)
    }

    public static let dncString = "?DNC?"

    public static func == (a: FrameValuesString, b: FrameValuesString) -> Bool {
        return (a.frame == dncString || b.frame == dncString || a.frame == b.frame)
            && (a.roll1 == dncString || b.roll1 == dncString || a.roll1 == b.roll1)
            && (a.roll2 == dncString || b.roll2 == dncString || a.roll2 == b.roll2)
            && (a.roll3 == dncString || b.roll3 == dncString || a.roll3 == b.roll3)
            && (a.score == dncString || b.score == dncString || a.score == b.score)
            && (a.totalScore == dncString || b.totalScore == dncString || a.totalScore == b.totalScore)
    }
}
