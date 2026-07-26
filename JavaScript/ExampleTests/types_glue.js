import { ValidValuesTyped } from "./common/index.js";
import { Dollar, SimpleText } from "./production/index.js";

export class TypesGlue {
  static DNC_STRING = "?DNC?";

  examplesDataTypeDollar(values) {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new Dollar(vvt.value); } catch (e) { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }

  examplesDataTypeSimpleText(values) {
    values.forEach((value) => {
      const vvt = ValidValuesTyped.fromStringObj(value);
      let failed = false;
      try { new SimpleText(vvt.value); } catch (e) { failed = true; }
      expect(vvt.isValid).toBe(!failed);
    });
  }
}
