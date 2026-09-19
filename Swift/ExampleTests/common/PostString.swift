public struct PostString: CustomStringConvertible, Equatable {
    public let userId: String
    public let id: String
    public let title: String
    public let body: String

    public init(userId: String, id: String, title: String, body: String) {
        self.userId = userId
        self.id = id
        self.title = title
        self.body = body
    }

    public init(fromArray v: [String]) {
        self.userId = v.count > 0 ? v[0] : ""
        self.id = v.count > 1 ? v[1] : ""
        self.title = v.count > 2 ? v[2] : ""
        self.body = v.count > 3 ? v[3] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> PostString {
        let parts = Tokens.require(text, 4, "Post")
        return PostString(userId: parts[0], id: parts[1], title: parts[2], body: parts[3])
    }

    public var description: String {
        return Tokens.token(userId) + " " + Tokens.token(id) + " " + Tokens.token(title) + " " + Tokens.token(body)
    }

    public static let dncString = "?DNC?"

    public static func == (a: PostString, b: PostString) -> Bool {
        return (a.userId == dncString || b.userId == dncString || a.userId == b.userId)
            && (a.id == dncString || b.id == dncString || a.id == b.id)
            && (a.title == dncString || b.title == dncString || a.title == b.title)
            && (a.body == dncString || b.body == dncString || a.body == b.body)
    }
}
