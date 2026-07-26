import { AdderTyped } from "./common/index.js";
import { Calculator } from "./production/index.js";

export class CalculatorGlue {
  static DNC_STRING = "?DNC?";

  constructor() { this.calc = new Calculator(); }

  examplesCalculationAddTwoNumbers(values) {
    values.forEach((value) => {
      const typed = AdderTyped.fromStringObj(value);
      expect(this.calc.add(typed.number1, typed.number2)).toBe(typed.result);
    });
  }
}
