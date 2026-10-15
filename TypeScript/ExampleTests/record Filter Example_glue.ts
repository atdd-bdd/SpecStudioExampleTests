import { FandCString, FandCTyped, FilterValueString, FilterValueTyped,
         IDValueString, IDValueTyped, ResultValueString, ResultValueTyped,
         ValidValuesString, ValidValuesTyped } from "./common/index.js";
import { IDForm, IDValue, RecordFilter, fahrenheitToCelsius }
  from "./production/index.js";

export class RecordFilterExampleGlue {
  private recordFilter = new RecordFilter();
  private computedSum = 0;

  givenListOfNumbers(values: readonly IDValueString[]): void {
    this.recordFilter = new RecordFilter();
    values.forEach((value) => {
      const typed = IDValueTyped.fromStringObj(value);
      this.recordFilter.add(new IDValue(new IDForm(typed.iD), typed.value));
    });
  }

  whenFilteredByIDWithValue(values: readonly IDForm[]): void {
    if (values.length > 0) {
      this.computedSum = this.recordFilter.sumByLabel(values[0]!);
    }
  }

  thenSumIs(values: readonly number[]): void {
    if (values.length > 0) {
      expect(this.computedSum).toBe(values[0]!);
    }
  }

  whenFilteredBy(values: readonly FilterValueString[]): void {
    values.forEach((value) => {
      const typed = FilterValueTyped.fromStringObj(value);
      this.computedSum = this.recordFilter.sumByLabel(new IDForm(typed.value));
    });
  }

  thenResult(values: readonly ResultValueString[]): void {
    values.forEach((value) => {
      const typed = ResultValueTyped.fromStringObj(value);
      expect(this.computedSum).toBe(typed.sum);
    });
  }

  whenElementAdded(values: readonly IDValueString[]): void {
    values.forEach((value) => {
      const typed = IDValueTyped.fromStringObj(value);
      this.recordFilter.add(new IDValue(new IDForm(typed.iD), typed.value));
    });
  }

  examplesCalculationConvertFToC(values: readonly FandCString[]): void {
    values.forEach((value) => {
      const typed = FandCTyped.fromStringObj(value);
      expect(fahrenheitToCelsius(typed.f)).toBe(typed.c);
    });
  }

  examplesDataTypeIDForm(values: readonly ValidValuesString[]): void {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new IDForm(vvt.value); } catch { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }
}
