public struct FandCString: CustomStringConvertible, Equatable {
    public let f: String
    public let c: String
    public let notes: String

    public init(f: String, c: String, notes: String) {
        self.f = f
        self.c = c
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.f = v.count > 0 ? v[0] : ""
        self.c = v.count > 1 ? v[1] : ""
        self.notes = v.count > 2 ? v[2] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> FandCString {
        let parts = Tokens.require(text, 3, "FandC")
        return FandCString(f: parts[0], c: parts[1], notes: parts[2])
    }

    public var description: String {
        return Tokens.token(f) + " " + Tokens.token(c) + " " + Tokens.token(notes)
    }

    public static let dncString = "?DNC?"

    public static func == (a: FandCString, b: FandCString) -> Bool {
        return (a.f == dncString || b.f == dncString || a.f == b.f)
            && (a.c == dncString || b.c == dncString || a.c == b.c)
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
