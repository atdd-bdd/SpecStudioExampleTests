public struct PricingString: CustomStringConvertible, Equatable {
    public let totalPrice: String

    public init(totalPrice: String) {
        self.totalPrice = totalPrice
    }

    public init(fromArray v: [String]) {
        self.totalPrice = v.count > 0 ? v[0] : ""
    }

    public var description: String {
        return "TotalPrice=\(totalPrice)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: PricingString, b: PricingString) -> Bool {
        return (a.totalPrice == dncString || b.totalPrice == dncString || a.totalPrice == b.totalPrice)
    }
}
