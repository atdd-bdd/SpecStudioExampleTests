import { AdderString, DiscountingString, FandCString, ShippingString, ValidValuesString } from "./common/index.js";
import { CalculatorGlue } from "./calculator_glue.js";

describe("Calculator", () => {

  test("Calculation Add_two_numbers", () => {
    const glue = new CalculatorGlue();
    const objectList1: AdderString[] = [
      new AdderString("2", "3", "5"),
      new AdderString("10", "20", "30"),
      new AdderString("-1", "1", "0"),
    ];
    glue.examplesCalculationAddTwoNumbers(objectList1);
  });

});
