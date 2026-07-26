import XCTest

final class ShoppingCartTests: XCTestCase {

    func testAddItems() {
        let glue = ShoppingCartGlue()
        glue.givenCatalogHas([
            CatalogItemString(fromArray: ["Widget", "10"]),
            CatalogItemString(fromArray: ["WhatCallIt", "20"]),
            CatalogItemString(fromArray: ["ThingaMaJig", "30"]),
        ])
        glue.givenItemCollectionIs([
        ])
        glue.whenItemAdded([
            OrderItemString(fromArray: ["Widget", "2", "1", "1"]),
        ])
        glue.thenItemCollectionIs([
            OrderItemString(fromArray: ["Widget", "2", "$10.00", "$20.00"]),
        ])
        glue.whenItemAdded([
            OrderItemString(fromArray: ["WhatCallIt", "3", "1", "1"]),
        ])
        glue.thenItemCollectionIs([
            OrderItemString(fromArray: ["Widget", "2", "$10.00", "$20.00"]),
            OrderItemString(fromArray: ["WhatCallIt", "3", "$20.00", "$60.00"]),
        ])
    }

    func testAShoppingCartWithAddresses() {
        let glue = ShoppingCartGlue()
        glue.givenCatalogHas([
            CatalogItemString(fromArray: ["Widget", "10"]),
            CatalogItemString(fromArray: ["WhatCallIt", "20"]),
            CatalogItemString(fromArray: ["ThingaMaJig", "30"]),
        ])
        glue.givenShoppingCart([
            ShoppingCartString(items: "=EmptyCart", shipping: "$0", discount: "$0", totalPrice: "$0", shippingAddress: AddressString(street: "2 Apple Lane", city: "Somewhere", state: "NC", zIP: "27706"), billingAddress: AddressString(street: "1 Apple Lane", city: "Somewhere", state: "NC", zIP: "27705")),
        ])
    }

    func testAddItemsToShoppingCart() {
        let glue = ShoppingCartGlue()
        glue.givenCatalogHas([
            CatalogItemString(fromArray: ["Widget", "10"]),
            CatalogItemString(fromArray: ["WhatCallIt", "20"]),
            CatalogItemString(fromArray: ["ThingaMaJig", "30"]),
        ])
        glue.givenShoppingCart([
            ShoppingCartString(items: "=EmptyCart", shipping: "$0", discount: "$0", totalPrice: "$0", shippingAddress: AddressString(street: "", city: "", state: "", zIP: ""), billingAddress: AddressString(street: "", city: "", state: "", zIP: "")),
        ])
        glue.whenItemAdded([
            OrderItemString(fromArray: ["Widget", "2", "1", "1"]),
        ])
        glue.whenItemAdded([
            OrderItemString(fromArray: ["WhatCallIt", "3", "1", "1"]),
        ])
        glue.thenShoppingCartIs([
            ShoppingCartString(items: "=TwoItemCart", shipping: "$5", discount: "$4", totalPrice: "$81", shippingAddress: AddressString(street: "", city: "", state: "", zIP: ""), billingAddress: AddressString(street: "", city: "", state: "", zIP: "")),
        ])
    }

    func testCostOfEmptyOrderItemCollection() {
        let glue = ShoppingCartGlue()
        glue.givenCatalogHas([
            CatalogItemString(fromArray: ["Widget", "10"]),
            CatalogItemString(fromArray: ["WhatCallIt", "20"]),
            CatalogItemString(fromArray: ["ThingaMaJig", "30"]),
        ])
        glue.givenItemCollection([
        ])
        glue.whenTotalComputed()
        glue.thenResultIs([
            PricingString(fromArray: ["$0"]),
        ])
    }

    func testBusinessRuleShippingCost() {
        let glue = ShoppingCartGlue()
        glue.examplesBusinessRuleShippingCost([
            ShippingString(fromArray: ["$99.99", "$5.00", "Less than $100"]),
            ShippingString(fromArray: ["$100.00", "$0", "Free if $100 or more"]),
        ])
    }

    func testBusinessRuleDiscount() {
        let glue = ShoppingCartGlue()
        glue.examplesBusinessRuleDiscount([
            DiscountingString(fromArray: ["$24.99", "0", ""]),
            DiscountingString(fromArray: ["$25.00", "5", ""]),
            DiscountingString(fromArray: ["$99.99", "5", ""]),
            DiscountingString(fromArray: ["$100.00", "10", ""]),
        ])
    }

    func testDataTypePercentage() {
        let glue = ShoppingCartGlue()
        glue.examplesDataTypePercentage([
            ValidValuesString(fromArray: ["0", "y", ""]),
            ValidValuesString(fromArray: ["99", "y", ""]),
            ValidValuesString(fromArray: ["100", "y", ""]),
            ValidValuesString(fromArray: ["101", "n", ""]),
            ValidValuesString(fromArray: ["-1", "n", ""]),
        ])
    }

}
