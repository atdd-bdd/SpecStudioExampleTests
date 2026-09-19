public struct FrameDisplayString: CustomStringConvertible, Equatable {
    public let frame: String
    public let mark1: String
    public let mark2: String
    public let mark3: String
    public let totalScore: String

    public init(frame: String, mark1: String, mark2: String, mark3: String, totalScore: String) {
        self.frame = frame
        self.mark1 = mark1
        self.mark2 = mark2
        self.mark3 = mark3
        self.totalScore = totalScore
    }

    public init(fromArray v: [String]) {
        self.frame = v.count > 0 ? v[0] : ""
        self.mark1 = v.count > 1 ? v[1] : ""
        self.mark2 = v.count > 2 ? v[2] : ""
        self.mark3 = v.count > 3 ? v[3] : ""
        self.totalScore = v.count > 4 ? v[4] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> FrameDisplayString {
        let parts = Tokens.require(text, 5, "FrameDisplay")
        return FrameDisplayString(frame: parts[0], mark1: parts[1], mark2: parts[2], mark3: parts[3], totalScore: parts[4])
    }

    public var description: String {
        return Tokens.token(frame) + " " + Tokens.token(mark1) + " " + Tokens.token(mark2) + " " + Tokens.token(mark3) + " " + Tokens.token(totalScore)
    }

    public static let dncString = "?DNC?"

    public static func == (a: FrameDisplayString, b: FrameDisplayString) -> Bool {
        return (a.frame == dncString || b.frame == dncString || a.frame == b.frame)
            && (a.mark1 == dncString || b.mark1 == dncString || a.mark1 == b.mark1)
            && (a.mark2 == dncString || b.mark2 == dncString || a.mark2 == b.mark2)
            && (a.mark3 == dncString || b.mark3 == dncString || a.mark3 == b.mark3)
            && (a.totalScore == dncString || b.totalScore == dncString || a.totalScore == b.totalScore)
    }
}
