import { AdderString, DiscountingString, FandCString, ShippingString, ValidValuesString } from "./common/index.js";
import { TypesGlue } from "./types_glue.js";

describe("Types", () => {

  test("DataType Dollar", () => {
    const glue = new TypesGlue();
    const objectList1 = [
      new ValidValuesString("0", "true", ""),
      new ValidValuesString("0.01", "true", ""),
      new ValidValuesString("-1", "false", "Negative not allowed"),
      new ValidValuesString("0.001", "false", "Only 2 decimal digits"),
    ];
    glue.examplesDataTypeDollar(objectList1);
  });

  test("DataType SimpleText", () => {
    const glue = new TypesGlue();
    const objectList2 = [
      new ValidValuesString("abc", "y", ""),
      new ValidValuesString("ab.", "y", "period okay"),
      new ValidValuesString("1234567890", "y", "digits"),
      new ValidValuesString("@", "n", ""),
      new ValidValuesString("-a-b", "y", "hyphens"),
    ];
    glue.examplesDataTypeSimpleText(objectList2);
  });

});
