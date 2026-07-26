import { AdderString, CatalogItemString, DiscountingString, FandCString, OrderItemString, PricingString, ShippingString, ShoppingCartString, ValidValuesString } from "./common/index.js";

export class ShoppingCartGlue {
  static DNC_STRING = "?DNC?";

  givenCatalogHas(values: readonly CatalogItemString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: givenCatalogHas");
  }

  givenItemCollectionIs(values: readonly OrderItemString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: givenItemCollectionIs");
  }

  whenItemAdded(values: readonly OrderItemString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: whenItemAdded");
  }

  thenItemCollectionIs(values: readonly OrderItemString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: thenItemCollectionIs");
  }

  givenShoppingCart(values: readonly ShoppingCartString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: givenShoppingCart");
  }

  thenShoppingCartIs(values: readonly ShoppingCartString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: thenShoppingCartIs");
  }

  givenItemCollection(values: readonly OrderItemString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: givenItemCollection");
  }

  whenTotalComputed(): void {
    throw new Error("Not implemented: whenTotalComputed");
  }

  thenResultIs(values: readonly PricingString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: thenResultIs");
  }

  examplesBusinessRuleShippingCost(values: readonly ShippingString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesBusinessRuleShippingCost");
  }

  examplesBusinessRuleDiscount(values: readonly DiscountingString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesBusinessRuleDiscount");
  }

  examplesDataTypePercentage(values: readonly ValidValuesString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypePercentage");
  }

  examplesCalculationAddTwoNumbers(values: readonly AdderString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesCalculationAddTwoNumbers");
  }

  examplesCalculationConvertFToC(values: readonly FandCString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesCalculationConvertFToC");
  }

  examplesDataTypeIDForm(values: readonly ValidValuesString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeIDForm");
  }

  examplesDataTypeDollar(values: readonly ValidValuesString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeDollar");
  }

  examplesDataTypeSimpleText(values: readonly ValidValuesString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeSimpleText");
  }
}
