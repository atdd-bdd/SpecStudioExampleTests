public struct DiscountingString: CustomStringConvertible, Equatable {
    public let totalPrice: String
    public let discount: String
    public let notes: String

    public init(totalPrice: String, discount: String, notes: String) {
        self.totalPrice = totalPrice
        self.discount = discount
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalPrice = v.count > 0 ? v[0] : ""
        self.discount = v.count > 1 ? v[1] : ""
        self.notes = v.count > 2 ? v[2] : ""
    }

    public var description: String {
        return "Total Price=\(totalPrice), Discount=\(discount), Notes=\(notes)"
    }
}
