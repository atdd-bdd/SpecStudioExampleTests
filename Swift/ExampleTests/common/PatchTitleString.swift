public struct PatchTitleString: CustomStringConvertible, Equatable {
    public let title: String

    public init(title: String) {
        self.title = title
    }

    public init(fromArray v: [String]) {
        self.title = v.count > 0 ? v[0] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> PatchTitleString {
        let parts = Tokens.require(text, 1, "PatchTitle")
        return PatchTitleString(title: parts[0])
    }

    public var description: String {
        return Tokens.token(title)
    }

    public static let dncString = "?DNC?"

    public static func == (a: PatchTitleString, b: PatchTitleString) -> Bool {
        return (a.title == dncString || b.title == dncString || a.title == b.title)
    }
}
