import { ValidValuesString, ValidValuesTyped } from "./common/index.js";
import { Dollar, SimpleText } from "./production/index.js";

export class TypesGlue {
  examplesDataTypeDollar(values: readonly ValidValuesString[]): void {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new Dollar(vvt.value); } catch { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }

  examplesDataTypeSimpleText(values: readonly ValidValuesString[]): void {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new SimpleText(vvt.value); } catch { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }
}
