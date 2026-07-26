import { AdderString, AdderTyped } from "./common/index.js";
import { Calculator } from "./production/index.js";

export class CalculatorGlue {
  private calc = new Calculator();

  examplesCalculationAddTwoNumbers(values: readonly AdderString[]): void {
    values.forEach((value) => {
      const typed = AdderTyped.fromStringObj(value);
      expect(this.calc.add(typed.number1, typed.number2)).toBe(typed.result);
    });
  }
}
