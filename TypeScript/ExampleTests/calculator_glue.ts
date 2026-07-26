import { AdderString, DiscountingString, FandCString, ShippingString, ValidValuesString } from "./common/index.js";

export class CalculatorGlue {
  static DNC_STRING = "?DNC?";

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

  examplesDataTypeDollar(values: readonly ValidValuesString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeDollar");
  }

  examplesDataTypeSimpleText(values: readonly ValidValuesString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeSimpleText");
  }
}
