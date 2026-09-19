public struct NewPostString: CustomStringConvertible, Equatable {
    public let title: String
    public let body: String
    public let userId: String

    public init(title: String, body: String, userId: String) {
        self.title = title
        self.body = body
        self.userId = userId
    }

    public init(fromArray v: [String]) {
        self.title = v.count > 0 ? v[0] : ""
        self.body = v.count > 1 ? v[1] : ""
        self.userId = v.count > 2 ? v[2] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> NewPostString {
        let parts = Tokens.require(text, 3, "NewPost")
        return NewPostString(title: parts[0], body: parts[1], userId: parts[2])
    }

    public var description: String {
        return Tokens.token(title) + " " + Tokens.token(body) + " " + Tokens.token(userId)
    }

    public static let dncString = "?DNC?"

    public static func == (a: NewPostString, b: NewPostString) -> Bool {
        return (a.title == dncString || b.title == dncString || a.title == b.title)
            && (a.body == dncString || b.body == dncString || a.body == b.body)
            && (a.userId == dncString || b.userId == dncString || a.userId == b.userId)
    }
}
