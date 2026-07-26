import XCTest

public class ShoppingCartGlue {
    public init() {}

    public func givenCatalogHas(_ values: [CatalogItemString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: givenCatalogHas")
    }

    public func givenItemCollectionIs(_ values: [OrderItemString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: givenItemCollectionIs")
    }

    public func whenItemAdded(_ values: [OrderItemString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: whenItemAdded")
    }

    public func thenItemCollectionIs(_ values: [OrderItemString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: thenItemCollectionIs")
    }

    public func givenShoppingCart(_ values: [ShoppingCartString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: givenShoppingCart")
    }

    public func thenShoppingCartIs(_ values: [ShoppingCartString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: thenShoppingCartIs")
    }

    public func givenItemCollection(_ values: [OrderItemString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: givenItemCollection")
    }

    public func whenTotalComputed() {
        XCTFail("Not implemented: whenTotalComputed")
    }

    public func thenResultIs(_ values: [PricingString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: thenResultIs")
    }

    public func examplesBusinessRuleShippingCost(_ values: [ShippingString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: examplesBusinessRuleShippingCost")
    }

    public func examplesBusinessRuleDiscount(_ values: [DiscountingString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: examplesBusinessRuleDiscount")
    }

    public func examplesDataTypePercentage(_ values: [ValidValuesString]) {
        for value in values { print(value) }
        XCTFail("Not implemented: examplesDataTypePercentage")
    }
}
