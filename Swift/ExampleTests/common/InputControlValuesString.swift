public struct InputControlValuesString: CustomStringConvertible, Equatable {
    public let frame: String
    public let roll: String
    public let remaining: String

    public init(frame: String, roll: String, remaining: String) {
        self.frame = frame
        self.roll = roll
        self.remaining = remaining
    }

    public init(fromArray v: [String]) {
        self.frame = v.count > 0 ? v[0] : ""
        self.roll = v.count > 1 ? v[1] : ""
        self.remaining = v.count > 2 ? v[2] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> InputControlValuesString {
        let parts = Tokens.require(text, 3, "InputControlValues")
        return InputControlValuesString(frame: parts[0], roll: parts[1], remaining: parts[2])
    }

    public var description: String {
        return Tokens.token(frame) + " " + Tokens.token(roll) + " " + Tokens.token(remaining)
    }

    public static let dncString = "?DNC?"

    public static func == (a: InputControlValuesString, b: InputControlValuesString) -> Bool {
        return (a.frame == dncString || b.frame == dncString || a.frame == b.frame)
            && (a.roll == dncString || b.roll == dncString || a.roll == b.roll)
            && (a.remaining == dncString || b.remaining == dncString || a.remaining == b.remaining)
    }
}
