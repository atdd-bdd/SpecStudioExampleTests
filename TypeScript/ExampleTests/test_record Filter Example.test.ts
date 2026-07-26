import { AdderString, DiscountingString, FandCString, FilterValueString, IDValueString, ResultValueString, ShippingString, ValidValuesString } from "./common/index.js";
import { RecordFilterExampleGlue } from "./record Filter Example_glue.js";

describe("Record Filter Example", () => {

  test("Scenario Filter Data by ID", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList1 = [
      new IDValueString("Q1234", "1"),
      new IDValueString("Q9999", "2"),
      new IDValueString("Q1234", "3"),
    ];
    glue.givenListOfNumbers(objectList1);
    const stringListList2 = [
      ["Q1234"],
    ];
    glue.whenFilteredByIDWithValue(stringListList2);
    const stringListList3 = [
      ["4"],
    ];
    glue.thenSumIs(stringListList3);
  });

  test("Scenario Filter Data Another Way", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList4 = [
      new IDValueString("Q1234", "1"),
      new IDValueString("Q9999", "2"),
      new IDValueString("Q1234", "3"),
    ];
    glue.givenListOfNumbers(objectList4);
    const objectList5 = [
      new FilterValueString("Q1234"),
    ];
    glue.whenFilteredBy(objectList5);
    const objectList6 = [
      new ResultValueString("4"),
    ];
    glue.thenResult(objectList6);
  });

  test("Scenario Add another value", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList7 = [
      new IDValueString("Q1234", "1"),
      new IDValueString("Q9999", "2"),
      new IDValueString("Q1234", "3"),
    ];
    glue.givenListOfNumbers(objectList7);
    const objectList8 = [
      new IDValueString("Q1234", "4"),
    ];
    glue.whenElementAdded(objectList8);
    const objectList9 = [
      new FilterValueString("Q1234"),
    ];
    glue.whenFilteredBy(objectList9);
    const objectList10 = [
      new ResultValueString("8"),
    ];
    glue.thenResult(objectList10);
  });

  test("Calculation Convert_F_to_C", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList11 = [
      new FandCString("32", "0", "Freezing"),
      new FandCString("212", "100", "Boiling"),
      new FandCString("-40", "-40", "Below zero"),
      new FandCString("68", "20", "Photo chem"),
    ];
    glue.examplesCalculationConvertFToC(objectList11);
  });

  test("DataType IDForm", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList12 = [
      new ValidValuesString("Q1234", "true", ""),
      new ValidValuesString("Q123", "false", "Too short"),
      new ValidValuesString("Q12345", "false", "Too long"),
      new ValidValuesString("A1234", "false", "Must begin with Q"),
    ];
    glue.examplesDataTypeIDForm(objectList12);
  });

});
