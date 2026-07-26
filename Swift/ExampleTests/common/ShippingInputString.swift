public struct ShippingInputString: CustomStringConvertible, Equatable {
    public let totalPrice: String
    public let shippingCost: String
    public let notes: String

    public init(totalPrice: String, shippingCost: String, notes: String) {
        self.totalPrice = totalPrice
        self.shippingCost = shippingCost
        self.notes = notes
    }

    public init(fromArray v: [String]) {
        self.totalPrice = v.count > 0 ? v[0] : ""
        self.shippingCost = v.count > 1 ? v[1] : ""
        self.notes = v.count > 2 ? v[2] : ""
    }

    public var description: String {
        return "Total Price=\(totalPrice), Shipping Cost=\(shippingCost), Notes=\(notes)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: ShippingInputString, b: ShippingInputString) -> Bool {
        return (a.totalPrice == dncString || b.totalPrice == dncString || a.totalPrice == b.totalPrice)
            && (a.shippingCost == dncString || b.shippingCost == dncString || a.shippingCost == b.shippingCost)
            && (a.notes == dncString || b.notes == dncString || a.notes == b.notes)
    }
}
