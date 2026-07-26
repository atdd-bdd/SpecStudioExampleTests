import { AdderString, CartInputString, DiscountInputString, FandCString, FilterValueString, IDValueString, ResultValueString, ShippingInputString, ValidValuesString } from "./common/index.js";
import { RecordFilterExampleGlue } from "./record Filter Example_glue.js";

describe("Record Filter Example", () => {

  test("Scenario Filter Data by ID", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList1: IDValueString[] = [
      new IDValueString("Q1234", "1"),
      new IDValueString("Q9999", "2"),
      new IDValueString("Q1234", "3"),
    ];
    glue.givenListOfNumbers(objectList1);
    const stringListList2: string[][] = [
      ["Q1234"],
    ];
    glue.whenFilteredByIDWithValue(stringListList2);
    const stringListList3: string[][] = [
      ["4"],
    ];
    glue.thenSumIs(stringListList3);
  });

  test("Scenario Filter Data Another Way", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList4: IDValueString[] = [
      new IDValueString("Q1234", "1"),
      new IDValueString("Q9999", "2"),
      new IDValueString("Q1234", "3"),
    ];
    glue.givenListOfNumbers(objectList4);
    const objectList5: FilterValueString[] = [
      new FilterValueString("Q1234"),
    ];
    glue.whenFilteredBy(objectList5);
    const objectList6: ResultValueString[] = [
      new ResultValueString("4"),
    ];
    glue.thenResult(objectList6);
  });

  test("Scenario Add another value", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList7: IDValueString[] = [
      new IDValueString("Q1234", "1"),
      new IDValueString("Q9999", "2"),
      new IDValueString("Q1234", "3"),
    ];
    glue.givenListOfNumbers(objectList7);
    const objectList8: IDValueString[] = [
      new IDValueString("Q1234", "4"),
    ];
    glue.whenElementAdded(objectList8);
    const objectList9: FilterValueString[] = [
      new FilterValueString("Q1234"),
    ];
    glue.whenFilteredBy(objectList9);
    const objectList10: ResultValueString[] = [
      new ResultValueString("8"),
    ];
    glue.thenResult(objectList10);
  });

  test("Calculation Convert_F_to_C", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList11: FandCString[] = [
      new FandCString("32", "0", "Freezing"),
      new FandCString("212", "100", "Boiling"),
      new FandCString("-40", "-40", "Below zero"),
      new FandCString("68", "20", "Photo chem"),
    ];
    glue.examplesCalculationConvertFToC(objectList11);
  });

  test("DataType IDForm", () => {
    const glue = new RecordFilterExampleGlue();
    const objectList12: ValidValuesString[] = [
      new ValidValuesString("Q1234", "true", ""),
      new ValidValuesString("Q123", "false", "Too short"),
      new ValidValuesString("Q12345", "false", "Too long"),
      new ValidValuesString("A1234", "false", "Must begin with Q"),
    ];
    glue.examplesDataTypeIDForm(objectList12);
  });

});
