public struct AddressString: CustomStringConvertible, Equatable {
    public let street: SimpleTextString
    public let city: SimpleTextString
    public let state: SimpleTextString
    public let zIP: SimpleTextString

    public init(street: SimpleTextString, city: SimpleTextString, state: SimpleTextString, zIP: SimpleTextString) {
        self.street = street
        self.city = city
        self.state = state
        self.zIP = zIP
    }

    public init(fromArray v: [String]) {
        self.street = SimpleTextString(v.count > 0 ? v[0] : "")
        self.city = SimpleTextString(v.count > 1 ? v[1] : "")
        self.state = SimpleTextString(v.count > 2 ? v[2] : "")
        self.zIP = SimpleTextString(v.count > 3 ? v[3] : "")
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> AddressString {
        let parts = Tokens.require(text, 4, "Address")
        return AddressString(street: SimpleTextString(parts[0]), city: SimpleTextString(parts[1]), state: SimpleTextString(parts[2]), zIP: SimpleTextString(parts[3]))
    }

    public var description: String {
        return Tokens.token(street.value) + " " + Tokens.token(city.value) + " " + Tokens.token(state.value) + " " + Tokens.token(zIP.value)
    }

    public static let dncString = "?DNC?"

    public static func == (a: AddressString, b: AddressString) -> Bool {
        return a.street == b.street
            && a.city == b.city
            && a.state == b.state
            && a.zIP == b.zIP
    }
}
