import { AdderString, AddressString, CatalogItemString, DiscountingString, FandCString, OrderItemString, PricingString, ShippingString, ShoppingCartString, ValidValuesString } from "./common/index.js";
import { ShoppingCartGlue } from "./shopping Cart_glue.js";

describe("Shopping Cart", () => {

  test("Scenario Add items", () => {
    const glue = new ShoppingCartGlue();
    const objectList1: CatalogItemString[] = [
      new CatalogItemString("Widget", "10"),
      new CatalogItemString("WhatCallIt", "20"),
      new CatalogItemString("ThingaMaJig", "30"),
    ];
    glue.givenCatalogHas(objectList1);
    const objectList2: OrderItemString[] = [
    ];
    glue.givenItemCollectionIs(objectList2);
    const objectList3: OrderItemString[] = [
      new OrderItemString("Widget", "2", "1", "1"),
    ];
    glue.whenItemAdded(objectList3);
    const objectList4: OrderItemString[] = [
      new OrderItemString("Widget", "2", "$10.00", "$20.00"),
    ];
    glue.thenItemCollectionIs(objectList4);
    const objectList5: OrderItemString[] = [
      new OrderItemString("WhatCallIt", "3", "1", "1"),
    ];
    glue.whenItemAdded(objectList5);
    const objectList6: OrderItemString[] = [
      new OrderItemString("Widget", "2", "$10.00", "$20.00"),
      new OrderItemString("WhatCallIt", "3", "$20.00", "$60.00"),
    ];
    glue.thenItemCollectionIs(objectList6);
  });

  test("Scenario A ShoppingCart with Addresses", () => {
    const glue = new ShoppingCartGlue();
    const objectList7: CatalogItemString[] = [
      new CatalogItemString("Widget", "10"),
      new CatalogItemString("WhatCallIt", "20"),
      new CatalogItemString("ThingaMaJig", "30"),
    ];
    glue.givenCatalogHas(objectList7);
    const objectList8: ShoppingCartString[] = [
      new ShoppingCartString("=EmptyCart", "$0", "$0", "$0", new AddressString("2 Apple Lane", "Somewhere", "NC", "27706"), new AddressString("1 Apple Lane", "Somewhere", "NC", "27705")),
    ];
    glue.givenShoppingCart(objectList8);
  });

  test("Scenario Add items to Shopping Cart", () => {
    const glue = new ShoppingCartGlue();
    const objectList9: CatalogItemString[] = [
      new CatalogItemString("Widget", "10"),
      new CatalogItemString("WhatCallIt", "20"),
      new CatalogItemString("ThingaMaJig", "30"),
    ];
    glue.givenCatalogHas(objectList9);
    const objectList10: ShoppingCartString[] = [
      new ShoppingCartString("=EmptyCart", "$0", "$0", "$0", new AddressString("", "", "", ""), new AddressString("", "", "", "")),
    ];
    glue.givenShoppingCart(objectList10);
    const objectList11: OrderItemString[] = [
      new OrderItemString("Widget", "2", "1", "1"),
    ];
    glue.whenItemAdded(objectList11);
    const objectList12: OrderItemString[] = [
      new OrderItemString("WhatCallIt", "3", "1", "1"),
    ];
    glue.whenItemAdded(objectList12);
    const objectList13: ShoppingCartString[] = [
      new ShoppingCartString("=TwoItemCart", "$5", "$4", "$81", new AddressString("", "", "", ""), new AddressString("", "", "", "")),
    ];
    glue.thenShoppingCartIs(objectList13);
  });

  test("Scenario Cost of Empty OrderItemCollection", () => {
    const glue = new ShoppingCartGlue();
    const objectList14: CatalogItemString[] = [
      new CatalogItemString("Widget", "10"),
      new CatalogItemString("WhatCallIt", "20"),
      new CatalogItemString("ThingaMaJig", "30"),
    ];
    glue.givenCatalogHas(objectList14);
    const objectList15: OrderItemString[] = [
    ];
    glue.givenItemCollection(objectList15);
    glue.whenTotalComputed();
    const objectList16: PricingString[] = [
      new PricingString("$0"),
    ];
    glue.thenResultIs(objectList16);
  });

  test("BusinessRule Shipping_Cost", () => {
    const glue = new ShoppingCartGlue();
    const objectList17: ShippingString[] = [
      new ShippingString("$99.99", "$5.00", "Less than $100"),
      new ShippingString("$100.00", "$0", "Free if $100 or more"),
    ];
    glue.examplesBusinessRuleShippingCost(objectList17);
  });

  test("BusinessRule Discount", () => {
    const glue = new ShoppingCartGlue();
    const objectList18: DiscountingString[] = [
      new DiscountingString("$24.99", "0", ""),
      new DiscountingString("$25.00", "5", ""),
      new DiscountingString("$99.99", "5", ""),
      new DiscountingString("$100.00", "10", ""),
    ];
    glue.examplesBusinessRuleDiscount(objectList18);
  });

  test("DataType Percentage", () => {
    const glue = new ShoppingCartGlue();
    const objectList19: ValidValuesString[] = [
      new ValidValuesString("0", "y", ""),
      new ValidValuesString("99", "y", ""),
      new ValidValuesString("100", "y", ""),
      new ValidValuesString("101", "n", ""),
      new ValidValuesString("-1", "n", ""),
    ];
    glue.examplesDataTypePercentage(objectList19);
  });

});
