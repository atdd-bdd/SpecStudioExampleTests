public let orderItemCollectionMinimum = 0
public let orderItemCollectionMaximum = 100

public class OrderItemCollection {
    private var items: [OrderItem] = []

    public init() {}

    public func add(_ item: OrderItem) {
        items.append(item)
    }

    public func delete(_ item: OrderItem) -> Bool where OrderItem: Equatable {
        if let idx = items.firstIndex(where: { $0 == item }) {
            items.remove(at: idx)
            return true
        }
        return false
    }

    public func read() -> [OrderItem] {
        return items
    }

    public func update(_ oldItem: OrderItem, with newItem: OrderItem) -> Bool where OrderItem: Equatable {
        if let idx = items.firstIndex(where: { $0 == oldItem }) {
            items[idx] = newItem
            return true
        }
        return false
    }

    public var size: Int { return items.count }
}
