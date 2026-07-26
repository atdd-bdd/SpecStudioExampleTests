import { AdderString, DiscountingString, FandCString, FilterValueString, IDValueString, ResultValueString, ShippingString, ValidValuesString } from "./common/index.js";

export class RecordFilterExampleGlue {
  static DNC_STRING = "?DNC?";

  givenListOfNumbers(values: readonly IDValueString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: givenListOfNumbers");
  }

  whenFilteredByIDWithValue(values: readonly (readonly string[])[]): void {
    values.forEach((row) => console.log(Array.isArray(row) ? row.join(", ") : String(row)));
    throw new Error("Not implemented: whenFilteredByIDWithValue");
  }

  thenSumIs(values: readonly (readonly string[])[]): void {
    values.forEach((row) => console.log(Array.isArray(row) ? row.join(", ") : String(row)));
    throw new Error("Not implemented: thenSumIs");
  }

  whenFilteredBy(values: readonly FilterValueString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: whenFilteredBy");
  }

  thenResult(values: readonly ResultValueString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: thenResult");
  }

  whenElementAdded(values: readonly IDValueString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: whenElementAdded");
  }

  examplesCalculationConvertFToC(values: readonly FandCString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesCalculationConvertFToC");
  }

  examplesDataTypeIDForm(values: readonly ValidValuesString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeIDForm");
  }

  examplesCalculationAddTwoNumbers(values: readonly AdderString[]): void {
    values.forEach((v) => console.log(v.toString()));
    throw new Error("Not implemented: examplesCalculationAddTwoNumbers");
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
