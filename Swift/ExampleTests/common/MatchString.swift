public struct MatchString: CustomStringConvertible, Equatable {
    public let matchedAddress: String
    public let addressComponents: AddressComponentsString

    public init(matchedAddress: String, addressComponents: AddressComponentsString) {
        self.matchedAddress = matchedAddress
        self.addressComponents = addressComponents
    }

    public init(fromArray v: [String]) {
        self.matchedAddress = v.count > 0 ? v[0] : ""
        self.addressComponents = AddressComponentsString(fromArray: [])
    }

    /// Builds from the text form, e.g. Money as "25 USD".
    public static func fromText(_ text: String) -> MatchString {
        let parts = Tokens.require(text, 2, "Match")
        return MatchString(matchedAddress: parts[0], addressComponents: AddressComponentsString.fromText(parts[1]))
    }

    public var description: String {
        return Tokens.token(matchedAddress) + " " + Tokens.nested(addressComponents.description)
    }

    public static let dncString = "?DNC?"

    public static func == (a: MatchString, b: MatchString) -> Bool {
        return (a.matchedAddress == dncString || b.matchedAddress == dncString || a.matchedAddress == b.matchedAddress)
            && a.addressComponents == b.addressComponents
    }
}
