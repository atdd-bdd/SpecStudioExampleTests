public struct Match: Equatable {
    public let matchedAddress: String
    public let addressComponents: AddressComponents

    public init(matchedAddress: String, addressComponents: AddressComponents) {
        self.matchedAddress = matchedAddress
        self.addressComponents = addressComponents
    }
}
