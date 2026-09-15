public let matchCollectionMinimum = 0
public let matchCollectionMaximum = 10000

public class MatchCollection: Equatable {
    private var items: [Match] = []

    public init() {}

    public static func == (a: MatchCollection, b: MatchCollection) -> Bool {
        return a.items == b.items
    }

    public func add(_ item: Match) {
        items.append(item)
    }

    public func delete(_ item: Match) -> Bool {
        if let idx = items.firstIndex(where: { $0 == item }) {
            items.remove(at: idx)
            return true
        }
        return false
    }

    public func read() -> [Match] {
        return items
    }

    public func update(_ oldItem: Match, with newItem: Match) -> Bool {
        if let idx = items.firstIndex(where: { $0 == oldItem }) {
            items[idx] = newItem
            return true
        }
        return false
    }

    public var size: Int { return items.count }
}
