public struct InputControlValuesString: CustomStringConvertible, Equatable {
    public let frame: String
    public let roll: PinsString
    public let remaining: PinsString

    public init(frame: String, roll: PinsString, remaining: PinsString) {
        self.frame = frame
        self.roll = roll
        self.remaining = remaining
    }

    public init(fromArray v: [String]) {
        self.frame = v.count > 0 ? v[0] : ""
        self.roll = PinsString(v.count > 1 ? v[1] : "")
        self.remaining = PinsString(v.count > 2 ? v[2] : "")
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> InputControlValuesString {
        let parts = Tokens.require(text, 3, "InputControlValues")
        return InputControlValuesString(frame: parts[0], roll: PinsString(parts[1]), remaining: PinsString(parts[2]))
    }

    public var description: String {
        return Tokens.token(frame) + " " + Tokens.token(roll.value) + " " + Tokens.token(remaining.value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: InputControlValuesString, b: InputControlValuesString) -> Bool {
        return (a.frame == dncString || b.frame == dncString || a.frame == b.frame)
            && a.roll == b.roll
            && a.remaining == b.remaining
    }
}
