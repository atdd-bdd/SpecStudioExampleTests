import Foundation

// The entities and collections the Shopping Cart and Record Filter
// specifications describe.

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

public struct IDValue: Equatable {
    public let id: IDForm
    public let value: Int

    public init(id: IDForm, value: Int) {
        self.id = id
        self.value = value
    }
}

/// Holds IDValue records and sums the ones carrying a given ID.
public class RecordFilter {
    private var entries: [IDValue] = []

    public init() {}

    public func add(_ entry: IDValue) { entries.append(entry) }

    public func sumByLabel(_ filterLabel: IDForm) -> Int {
        return entries.filter { $0.id == filterLabel }.reduce(0) { $0 + $1.value }
    }
}

/// Truncates toward zero, so -40F comes out -40C.
public func fahrenheitToCelsius(_ fahrenheit: Int) -> Int {
    return (fahrenheit - 32) * 5 / 9
}

// ---------------------------------------------------------------------------
// Calculator
// ---------------------------------------------------------------------------

public class Calculator {
    public init() {}
    public func add(_ a: Int, _ b: Int) -> Int { return a + b }
}

// ---------------------------------------------------------------------------
// Shopping
// ---------------------------------------------------------------------------

public struct Address: Equatable {
    public let street: SimpleText
    public let city: SimpleText
    public let state: SimpleText
    public let zip: SimpleText

    public init(street: SimpleText, city: SimpleText,
                state: SimpleText, zip: SimpleText) {
        self.street = street
        self.city = city
        self.state = state
        self.zip = zip
    }
}

public struct CatalogItem: Equatable {
    public let name: SimpleText
    public let price: Dollar

    public init(name: SimpleText, price: Dollar) {
        self.name = name
        self.price = price
    }
}

public let catalogMinimum = 0
public let catalogMaximum = 10000000

/// The items on offer, each with the price an order line is charged.
public class Catalog: Equatable {
    private var items: [CatalogItem] = []

    public init() {}

    public static func == (a: Catalog, b: Catalog) -> Bool { a.items == b.items }

    public func add(_ item: CatalogItem) { items.append(item) }
    public func read() -> [CatalogItem] { return items }
    public var size: Int { return items.count }

    public func priceFor(_ name: SimpleText) -> Dollar? {
        return items.first { $0.name == name }?.price
    }
}

public struct OrderItem: Equatable {
    public let name: SimpleText
    public let quantity: Int
    public let price: Dollar
    public let itemTotal: Dollar

    public init(name: SimpleText, quantity: Int, price: Dollar, itemTotal: Dollar) {
        self.name = name
        self.quantity = quantity
        self.price = price
        self.itemTotal = itemTotal
    }

    public static func create(name: SimpleText, quantity: Int, price: Dollar) -> OrderItem {
        return OrderItem(name: name, quantity: quantity,
                         price: price, itemTotal: price.times(quantity))
    }

    /// Looks the price up rather than being told it.
    public static func fromCatalog(_ catalog: Catalog, name: SimpleText,
                                   quantity: Int) -> OrderItem? {
        guard let price = catalog.priceFor(name) else { return nil }
        return create(name: name, quantity: quantity, price: price)
    }
}

public let orderItemCollectionMinimum = 0
public let orderItemCollectionMaximum = 100

public class OrderItemCollection: Equatable {
    private var items: [OrderItem] = []

    public init() {}

    public static func == (a: OrderItemCollection, b: OrderItemCollection) -> Bool {
        a.items == b.items
    }

    public func add(_ item: OrderItem) { items.append(item) }
    public func read() -> [OrderItem] { return items }
    public var size: Int { return items.count }

    public func computeTotal() -> Dollar {
        return items.reduce(Dollar(cents: 0)) { $0.plus($1.itemTotal) }
    }
}

public class ShoppingCart {
    public let items: OrderItemCollection
    public let shippingAddress: Address?
    public let billingAddress: Address?

    public init(items: OrderItemCollection,
                shippingAddress: Address? = nil,
                billingAddress: Address? = nil) {
        self.items = items
        self.shippingAddress = shippingAddress
        self.billingAddress = billingAddress
    }

    // --- the two business rules -------------------------------------------

    /// Free once the order reaches $100, otherwise a flat $5.
    public static func shippingCostFor(_ totalPrice: Dollar) -> Dollar {
        return totalPrice.cents >= 10_000 ? Dollar(cents: 0) : Dollar(cents: 500)
    }

    /// Tiered: under $25 nothing, to $99.99 five percent, $100 up ten.
    public static func discountFor(_ totalPrice: Dollar) -> Percentage {
        if totalPrice.cents >= 10_000 { return Percentage(10) }
        if totalPrice.cents >= 2_500 { return Percentage(5) }
        return Percentage(0)
    }

    // --- what the cart comes to -------------------------------------------

    /// What the items come to before any discount or shipping.
    public func subtotal() -> Dollar { return items.computeTotal() }

    /// The discount as money: the tiered percentage of the subtotal.
    public func discountAmount() -> Dollar {
        let amount = subtotal()
        return amount.percentOf(ShoppingCart.discountFor(amount))
    }

    /// Shipping is charged on what the customer actually pays, so the discount
    /// comes off before the $100 threshold is tested — following the scenario's
    /// "Apply Discount to OrderItem Total, then add shipping".
    public func shippingCost() -> Dollar {
        return ShoppingCart.shippingCostFor(subtotal().minus(discountAmount()))
    }

    /// Subtotal, less the discount, plus shipping.
    public func computeTotal() -> Dollar {
        return subtotal().minus(discountAmount()).plus(shippingCost())
    }
}
