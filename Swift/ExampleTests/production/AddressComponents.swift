public struct AddressComponents: Equatable {
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
}
