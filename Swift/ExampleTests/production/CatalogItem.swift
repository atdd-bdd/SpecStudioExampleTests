public struct CatalogItem {
    public let name: SimpleText
    public let price: Dollar

    public init(name: SimpleText, price: Dollar) {
        self.name = name
        self.price = price
    }
}
