import XCTest

public class ShoppingCartGlue {
    public init() {}

    private let catalog = Catalog()
    private var currentItems = OrderItemCollection()
    private var computedTotal = Dollar(cents: 0)

    private func cart() -> ShoppingCart {
        return ShoppingCart(items: currentItems)
    }

    private func dollar(_ s: String) -> Dollar {
        guard let d = try? Dollar(s) else {
            XCTFail("bad dollar \(s)")
            return Dollar(cents: 0)
        }
        return d
    }

    public func givenCatalogHas(_ values: [CatalogItemString]) {
        for value in values {
            let typed = CatalogItemTyped(from: value)
            catalog.add(CatalogItem(name: SimpleText(unchecked: typed.name),
                                    price: dollar(typed.price)))
        }
    }

    public func givenItemCollectionIs(_ values: [OrderItemString]) {
        givenItemCollection(values)
    }

    public func givenItemCollection(_ values: [OrderItemString]) {
        currentItems = OrderItemCollection()
        for value in values {
            let typed = OrderItemTyped(from: value)
            currentItems.add(OrderItem(name: SimpleText(unchecked: typed.name),
                                       quantity: typed.quantity,
                                       price: dollar(typed.price),
                                       itemTotal: dollar(typed.itemTotal)))
        }
    }

    public func whenItemAdded(_ values: [OrderItemString]) {
        for value in values {
            let typed = OrderItemTyped(from: value)
            guard let item = OrderItem.fromCatalog(
                catalog, name: SimpleText(unchecked: typed.name),
                quantity: typed.quantity) else {
                return XCTFail("item not in catalog: \(typed.name)")
            }
            currentItems.add(item)
        }
    }

    public func thenItemCollectionIs(_ values: [OrderItemString]) {
        let actual = currentItems.read()
        XCTAssertEqual(values.count, actual.count, "Item count")
        guard values.count == actual.count else { return }
        for (i, value) in values.enumerated() {
            let typed = OrderItemTyped(from: value)
            XCTAssertEqual(typed.name, actual[i].name.value, "Item \(i) name")
            XCTAssertEqual(typed.quantity, actual[i].quantity, "Item \(i) quantity")
            XCTAssertEqual(dollar(typed.price), actual[i].price, "Item \(i) price")
            XCTAssertEqual(dollar(typed.itemTotal), actual[i].itemTotal,
                           "Item \(i) itemTotal")
        }
    }

    public func givenShoppingCart(_ values: [ShoppingCartString]) {
        // Every scenario starts from =EmptyCart, which carries no data rows, so
        // begin with a fresh collection rather than resolving the Define.
        currentItems = OrderItemCollection()
    }

    public func thenShoppingCartIs(_ values: [ShoppingCartString]) {
        for value in values {
            let typed = ShoppingCartTyped(from: value)
            let c = cart()
            // Shipping and Discount are outcomes of the two business rules, not
            // the values the Given supplied, so ask the cart for them.
            XCTAssertEqual(dollar(typed.totalPrice), c.computeTotal(), "TotalPrice")
            XCTAssertEqual(dollar(typed.shipping), c.shippingCost(), "Shipping")
            XCTAssertEqual(dollar(typed.discount), c.discountAmount(), "Discount")
        }
    }

    public func whenTotalComputed() {
        computedTotal = currentItems.computeTotal()
    }

    public func thenResultIs(_ values: [PricingString]) {
        for value in values {
            let typed = PricingTyped(from: value)
            XCTAssertEqual(dollar(typed.totalPrice), computedTotal, "TotalPrice")
        }
    }

    public func examplesBusinessRuleShippingCost(_ values: [ShippingInputString]) {
        for value in values {
            let typed = ShippingInputTyped(from: value)
            XCTAssertEqual(dollar(typed.shippingCost),
                           ShoppingCart.shippingCostFor(dollar(typed.totalPrice)),
                           "Shipping cost for \(typed.totalPrice)")
        }
    }

    public func examplesBusinessRuleDiscount(_ values: [DiscountInputString]) {
        for value in values {
            let typed = DiscountInputTyped(from: value)
            guard let expected = try? Percentage(typed.discount) else {
                return XCTFail("bad percentage \(typed.discount)")
            }
            XCTAssertEqual(expected,
                           ShoppingCart.discountFor(dollar(typed.totalPrice)),
                           "Discount for \(typed.totalPrice)")
        }
    }

    public func examplesDataTypePercentage(_ values: [ValidValuesString]) {
        for value in values {
            let vvt = ValidValuesTyped(from: value)
            var failed = false
            do { _ = try Percentage(vvt.value) } catch { failed = true }
            XCTAssertEqual(vvt.isValid, !failed, " Value \(vvt.value)")
        }
    }

    public func thenTotalOfItemsIs(_ values: [ItemPriceInputString]) {
        for value in values {
            let typed = ItemPriceInputTyped(from: value)
            XCTAssertEqual(dollar(typed.totalItems), currentItems.computeTotal(),
                           "TotalItems")
        }
    }

    public func examplesBusinessRuleTotalCartPrice(_ values: [CartInputString]) {
        for value in values {
            let typed = CartInputTyped(from: value)
            // The rule states the whole calculation from an item total, so drive
            // it that way rather than building a cart to reach the same numbers.
            let total = dollar(typed.totalItems)
            XCTAssertEqual(dollar(typed.discount),
                           ShoppingCart.discountAmountFor(total),
                           "Discount for \(typed.totalItems)")
            XCTAssertEqual(dollar(typed.shipping),
                           ShoppingCart.shippingFor(total),
                           "Shipping for \(typed.totalItems)")
            XCTAssertEqual(dollar(typed.totalPrice),
                           ShoppingCart.totalPriceFor(total),
                           "Total Price for \(typed.totalItems)")
        }
    }

}
