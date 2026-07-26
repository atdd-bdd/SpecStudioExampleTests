import { FandCTyped, FilterValueTyped, IDValueTyped, ResultValueTyped,
         ValidValuesTyped } from "./common/index.js";
import { IDForm, IDValue, RecordFilter, fahrenheitToCelsius }
  from "./production/index.js";

export class RecordFilterExampleGlue {
  static DNC_STRING = "?DNC?";

  constructor() {
    this.recordFilter = new RecordFilter();
    this.computedSum = 0;
  }

  givenListOfNumbers(values) {
    this.recordFilter = new RecordFilter();
    values.forEach((value) => {
      const typed = IDValueTyped.fromStringObj(value);
      this.recordFilter.add(new IDValue(new IDForm(typed.iD), typed.value));
    });
  }

  whenFilteredByIDWithValue(values) {
    if (values.length > 0 && values[0].length > 0) {
      this.computedSum = this.recordFilter.sumByLabel(new IDForm(values[0][0]));
    }
  }

  thenSumIs(values) {
    if (values.length > 0 && values[0].length > 0) {
      expect(this.computedSum).toBe(parseInt(String(values[0][0]).trim(), 10));
    }
  }

  whenFilteredBy(values) {
    values.forEach((value) => {
      const typed = FilterValueTyped.fromStringObj(value);
      this.computedSum = this.recordFilter.sumByLabel(new IDForm(typed.value));
    });
  }

  thenResult(values) {
    values.forEach((value) => {
      const typed = ResultValueTyped.fromStringObj(value);
      expect(this.computedSum).toBe(typed.sum);
    });
  }

  whenElementAdded(values) {
    values.forEach((value) => {
      const typed = IDValueTyped.fromStringObj(value);
      this.recordFilter.add(new IDValue(new IDForm(typed.iD), typed.value));
    });
  }

  examplesCalculationConvertFToC(values) {
    values.forEach((value) => {
      const typed = FandCTyped.fromStringObj(value);
      expect(fahrenheitToCelsius(typed.f)).toBe(typed.c);
    });
  }

  examplesDataTypeIDForm(values) {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new IDForm(vvt.value); } catch (e) { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }
}
