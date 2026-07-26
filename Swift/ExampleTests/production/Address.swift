public struct Address {
    public let street: SimpleText
    public let city: SimpleText
    public let state: SimpleText
    public let zIP: SimpleText

    public init(street: SimpleText, city: SimpleText, state: SimpleText, zIP: SimpleText) {
        self.street = street
        self.city = city
        self.state = state
        self.zIP = zIP
    }
}
