public struct ReplacePostString: CustomStringConvertible, Equatable {
    public let id: String
    public let userId: String
    public let title: String
    public let body: String

    public init(id: String, userId: String, title: String, body: String) {
        self.id = id
        self.userId = userId
        self.title = title
        self.body = body
    }

    public init(fromArray v: [String]) {
        self.id = v.count > 0 ? v[0] : ""
        self.userId = v.count > 1 ? v[1] : ""
        self.title = v.count > 2 ? v[2] : ""
        self.body = v.count > 3 ? v[3] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> ReplacePostString {
        let parts = Tokens.require(text, 4, "ReplacePost")
        return ReplacePostString(id: parts[0], userId: parts[1], title: parts[2], body: parts[3])
    }

    public var description: String {
        return Tokens.token(id) + " " + Tokens.token(userId) + " " + Tokens.token(title) + " " + Tokens.token(body)
    }

    public static let dncString = "?DNC?"

    public static func == (a: ReplacePostString, b: ReplacePostString) -> Bool {
        return (a.id == dncString || b.id == dncString || a.id == b.id)
            && (a.userId == dncString || b.userId == dncString || a.userId == b.userId)
            && (a.title == dncString || b.title == dncString || a.title == b.title)
            && (a.body == dncString || b.body == dncString || a.body == b.body)
    }
}
