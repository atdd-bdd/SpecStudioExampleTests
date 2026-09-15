public struct AddressComponentsString: CustomStringConvertible, Equatable {
    public let zip: String
    public let streetName: String
    public let city: String
    public let preDirection: String
    public let suffixDirection: String
    public let state: String
    public let suffixType: String

    public init(zip: String, streetName: String, city: String, preDirection: String, suffixDirection: String, state: String, suffixType: String) {
        self.zip = zip
        self.streetName = streetName
        self.city = city
        self.preDirection = preDirection
        self.suffixDirection = suffixDirection
        self.state = state
        self.suffixType = suffixType
    }

    public init(fromArray v: [String]) {
        self.zip = v.count > 0 ? v[0] : ""
        self.streetName = v.count > 1 ? v[1] : ""
        self.city = v.count > 2 ? v[2] : ""
        self.preDirection = v.count > 3 ? v[3] : ""
        self.suffixDirection = v.count > 4 ? v[4] : ""
        self.state = v.count > 5 ? v[5] : ""
        self.suffixType = v.count > 6 ? v[6] : ""
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> AddressComponentsString {
        let parts = Tokens.require(text, 7, "AddressComponents")
        return AddressComponentsString(zip: parts[0], streetName: parts[1], city: parts[2], preDirection: parts[3], suffixDirection: parts[4], state: parts[5], suffixType: parts[6])
    }

    public var description: String {
        return Tokens.token(zip) + " " + Tokens.token(streetName) + " " + Tokens.token(city) + " " + Tokens.token(preDirection) + " " + Tokens.token(suffixDirection) + " " + Tokens.token(state) + " " + Tokens.token(suffixType)
    }

    public static let dncString = "?DNC?"

    public static func == (a: AddressComponentsString, b: AddressComponentsString) -> Bool {
        return (a.zip == dncString || b.zip == dncString || a.zip == b.zip)
            && (a.streetName == dncString || b.streetName == dncString || a.streetName == b.streetName)
            && (a.city == dncString || b.city == dncString || a.city == b.city)
            && (a.preDirection == dncString || b.preDirection == dncString || a.preDirection == b.preDirection)
            && (a.suffixDirection == dncString || b.suffixDirection == dncString || a.suffixDirection == b.suffixDirection)
            && (a.state == dncString || b.state == dncString || a.state == b.state)
            && (a.suffixType == dncString || b.suffixType == dncString || a.suffixType == b.suffixType)
    }
}
