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

    public var description: String {
        return "Street=\(street), City=\(city), State=\(state), ZIP=\(zIP)"
    }
}
