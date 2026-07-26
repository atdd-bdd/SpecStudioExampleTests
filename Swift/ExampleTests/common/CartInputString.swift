public struct CartInputString: CustomStringConvertible, Equatable {
    public let totalItems: String
    public let shipping: String
    public let discount: String
    public let totalPrice: String
    public let notes: String

    public init(totalItems: String, shipping: String, discount: String, totalPrice: String, notes: String) {
        self.totalItems = totalItems
        self.shipping = shipping
        self.discount = discount
        self.totalPrice = totalPrice
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalItems = v.count > 0 ? v[0] : ""
        self.shipping = v.count > 1 ? v[1] : ""
        self.discount = v.count > 2 ? v[2] : ""
        self.totalPrice = v.count > 3 ? v[3] : ""
        self.notes = v.count > 4 ? v[4] : ""
    }

    public var description: String {
        return "TotalItems=\(totalItems), Shipping=\(shipping), Discount=\(discount), Total Price=\(totalPrice), Notes=\(notes)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: CartInputString, b: CartInputString) -> Bool {
        return (a.totalItems == dncString || b.totalItems == dncString || a.totalItems == b.totalItems)
            && (a.shipping == dncString || b.shipping == dncString || a.shipping == b.shipping)
            && (a.discount == dncString || b.discount == dncString || a.discount == b.discount)
            && (a.totalPrice == dncString || b.totalPrice == dncString || a.totalPrice == b.totalPrice)
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
