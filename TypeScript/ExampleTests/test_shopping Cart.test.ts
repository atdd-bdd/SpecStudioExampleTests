import { AdderString, AddressString, CartInputString, CatalogItemString, DiscountInputString, FandCString, ItemPriceInputString, OrderItemString, ShippingInputString, ShoppingCartString, ValidValuesString } from "./common/index.js";
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
    const objectList7: ItemPriceInputString[] = [
      new ItemPriceInputString("$80"),
    ];
    glue.thenTotalOfItemsIs(objectList7);
  });

  test("Scenario A ShoppingCart with Addresses", () => {
    const glue = new ShoppingCartGlue();
    const objectList8: CatalogItemString[] = [
      new CatalogItemString("Widget", "10"),
      new CatalogItemString("WhatCallIt", "20"),
      new CatalogItemString("ThingaMaJig", "30"),
    ];
    glue.givenCatalogHas(objectList8);
    const objectList9: ShoppingCartString[] = [
      new ShoppingCartString("=EmptyCart", "$0", "$0", "$0", new AddressString("2 Apple Lane", "Somewhere", "NC", "27706"), new AddressString("1 Apple Lane", "Somewhere", "NC", "27705")),
    ];
    glue.givenShoppingCart(objectList9);
  });

  test("Scenario Add items to Shopping Cart", () => {
    const glue = new ShoppingCartGlue();
    const objectList10: CatalogItemString[] = [
      new CatalogItemString("Widget", "10"),
      new CatalogItemString("WhatCallIt", "20"),
      new CatalogItemString("ThingaMaJig", "30"),
    ];
    glue.givenCatalogHas(objectList10);
    const objectList11: ShoppingCartString[] = [
      new ShoppingCartString("=EmptyCart", "$0", "$0", "$0", new AddressString("", "", "", ""), new AddressString("", "", "", "")),
    ];
    glue.givenShoppingCart(objectList11);
    const objectList12: OrderItemString[] = [
      new OrderItemString("Widget", "2", "1", "1"),
    ];
    glue.whenItemAdded(objectList12);
    const objectList13: OrderItemString[] = [
      new OrderItemString("WhatCallIt", "3", "1", "1"),
    ];
    glue.whenItemAdded(objectList13);
    const objectList14: ShoppingCartString[] = [
      new ShoppingCartString("=TwoItemCart", "$5", "$4", "$81", new AddressString("", "", "", ""), new AddressString("", "", "", "")),
    ];
    glue.thenShoppingCartIs(objectList14);
  });

  test("Scenario Cost of Empty OrderItemCollection", () => {
    const glue = new ShoppingCartGlue();
    const objectList15: CatalogItemString[] = [
      new CatalogItemString("Widget", "10"),
      new CatalogItemString("WhatCallIt", "20"),
      new CatalogItemString("ThingaMaJig", "30"),
    ];
    glue.givenCatalogHas(objectList15);
    const objectList16: OrderItemString[] = [
    ];
    glue.givenItemCollection(objectList16);
    const objectList17: ItemPriceInputString[] = [
      new ItemPriceInputString("$0"),
    ];
    glue.thenTotalOfItemsIs(objectList17);
  });

  test("BusinessRule Total Cart Price", () => {
    const glue = new ShoppingCartGlue();
    const objectList18: CartInputString[] = [
      new CartInputString("$110", "$5", "$11", "$104", "Discount applied before shipping calculated"),
      new CartInputString("$80", "$5", "$4", "$81", ""),
    ];
    glue.examplesBusinessRuleTotalCartPrice(objectList18);
  });

  test("BusinessRule Shipping_Cost", () => {
    const glue = new ShoppingCartGlue();
    const objectList19: ShippingInputString[] = [
      new ShippingInputString("$99.99", "$5.00", "Less than $100"),
      new ShippingInputString("$100.00", "$0", "Free if $100 or more"),
    ];
    glue.examplesBusinessRuleShippingCost(objectList19);
  });

  test("BusinessRule Discount", () => {
    const glue = new ShoppingCartGlue();
    const objectList20: DiscountInputString[] = [
      new DiscountInputString("$24.99", "0", ""),
      new DiscountInputString("$25.00", "5", ""),
      new DiscountInputString("$99.99", "5", ""),
      new DiscountInputString("$100.00", "10", ""),
    ];
    glue.examplesBusinessRuleDiscount(objectList20);
  });

  test("DataType Percentage", () => {
    const glue = new ShoppingCartGlue();
    const objectList21: ValidValuesString[] = [
      new ValidValuesString("0", "y", ""),
      new ValidValuesString("99", "y", ""),
      new ValidValuesString("100", "y", ""),
      new ValidValuesString("101", "n", ""),
      new ValidValuesString("-1", "n", ""),
    ];
    glue.examplesDataTypePercentage(objectList21);
  });

});
