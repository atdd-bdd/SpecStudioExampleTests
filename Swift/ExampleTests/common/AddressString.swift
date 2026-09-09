public struct AddressString: CustomStringConvertible, Equatable {
    public let street: String
    public let city: String
    public let state: String
    public let zIP: String

    public init(street: String, city: String, state: String, zIP: String) {
        self.street = street
        self.city = city
        self.state = state
        self.zIP = zIP
    }

    public init(fromArray v: [String]) {
        self.street = v.count > 0 ? v[0] : ""
        self.city = v.count > 1 ? v[1] : ""
        self.state = v.count > 2 ? v[2] : ""
        self.zIP = v.count > 3 ? v[3] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> AddressString {
        let parts = Tokens.require(text, 4, "Address")
        return AddressString(street: parts[0], city: parts[1], state: parts[2], zIP: parts[3])
    }

    public var description: String {
        return Tokens.token(street) + " " + Tokens.token(city) + " " + Tokens.token(state) + " " + Tokens.token(zIP)
    }

    public static let dncString = "?DNC?"

    public static func == (a: AddressString, b: AddressString) -> Bool {
        return (a.street == dncString || b.street == dncString || a.street == b.street)
            && (a.city == dncString || b.city == dncString || a.city == b.city)
            && (a.state == dncString || b.state == dncString || a.state == b.state)
            && (a.zIP == dncString || b.zIP == dncString || a.zIP == b.zIP)
    }
}
