public let catalogMinimum = 0
public let catalogMaximum = 10000000

public class Catalog {
    private var items: [CatalogItem] = []

    public init() {}

    public func add(_ item: CatalogItem) {
        items.append(item)
    }

    public func delete(_ item: CatalogItem) -> Bool where CatalogItem: Equatable {
        if let idx = items.firstIndex(where: { $0 == item }) {
            items.remove(at: idx)
            return true
        }
        return false
    }

    public func read() -> [CatalogItem] {
        return items
    }

    public func update(_ oldItem: CatalogItem, with newItem: CatalogItem) -> Bool where CatalogItem: Equatable {
        if let idx = items.firstIndex(where: { $0 == oldItem }) {
            items[idx] = newItem
            return true
        }
        return false
    }

    public var size: Int { return items.count }
}
