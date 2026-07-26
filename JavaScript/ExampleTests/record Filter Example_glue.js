import { } from "./common/index.js";

export class RecordFilterExampleGlue {
  static DNC_STRING = "?DNC?";

  givenListOfNumbers(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: givenListOfNumbers");
  }

  whenFilteredByIDWithValue(values) {
    values.forEach(row => console.log(Array.isArray(row) ? row.join(", ") : String(row)));
    throw new Error("Not implemented: whenFilteredByIDWithValue");
  }

  thenSumIs(values) {
    values.forEach(row => console.log(Array.isArray(row) ? row.join(", ") : String(row)));
    throw new Error("Not implemented: thenSumIs");
  }

  whenFilteredBy(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: whenFilteredBy");
  }

  thenResult(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: thenResult");
  }

  whenElementAdded(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: whenElementAdded");
  }

  examplesCalculationConvertFToC(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesCalculationConvertFToC");
  }

  examplesDataTypeIDForm(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeIDForm");
  }

  examplesCalculationAddTwoNumbers(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesCalculationAddTwoNumbers");
  }

  examplesBusinessRuleShippingCost(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesBusinessRuleShippingCost");
  }

  examplesBusinessRuleDiscount(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesBusinessRuleDiscount");
  }

  examplesDataTypePercentage(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypePercentage");
  }

  examplesDataTypeDollar(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeDollar");
  }

  examplesDataTypeSimpleText(values) {
    values.forEach(v => console.log(v.toString()));
    throw new Error("Not implemented: examplesDataTypeSimpleText");
  }
}
