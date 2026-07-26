public struct ItemPriceInputString: CustomStringConvertible, Equatable {
    public let totalItems: String

    public init(totalItems: String) {
        self.totalItems = totalItems
    }

    public init(fromArray v: [String]) {
        self.totalItems = v.count > 0 ? v[0] : ""
    }

    public var description: String {
        return "TotalItems=\(totalItems)"
    }

    public static let dncString = "?DNC?"

    public static func == (a: ItemPriceInputString, b: ItemPriceInputString) -> Bool {
        return (a.totalItems == dncString || b.totalItems == dncString || a.totalItems == b.totalItems)
    }
}
