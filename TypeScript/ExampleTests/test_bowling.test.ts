import { AdderString, CartInputString, DiscountInputString, FandCString, FrameDisplayString, FrameValuesString, InputControlValuesString, ShippingInputString, ValidValuesString } from "./common/index.js";
import { BowlingGlue } from "./bowling_glue.js";

describe("Bowling", () => {

  test("Scenario Adding a roll", () => {
    const glue = new BowlingGlue();
    const stringListList1: string[][] = [
      ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10"],
    ];
    glue.givenRollsAre(stringListList1);
    const stringListList2: string[][] = [
      ["10"],
    ];
    glue.whenRollIs(stringListList2);
    const stringListList3: string[][] = [
      ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"],
    ];
    glue.thenRollsBecome(stringListList3);
  });

  test("Scenario Full Game Compute and Display", () => {
    const glue = new BowlingGlue();
    const stringListList4: string[][] = [
      ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"],
    ];
    glue.givenRollsAre(stringListList4);
    glue.whenScored();
    glue.thenDisplayIs("| 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |\n| 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |");
  });

  test("Scenario A Game in Steps", () => {
    const glue = new BowlingGlue();
    const stringListList5: string[][] = [
      ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"],
    ];
    glue.givenRollsAre(stringListList5);
    glue.whenScored();
    const objectList6: FrameValuesString[] = [
      new FrameValuesString("1", "5", "5", "4", "14", "14"),
      new FrameValuesString("2", "4", "5", "8", "9", "23"),
      new FrameValuesString("3", "8", "2", "10", "20", "43"),
      new FrameValuesString("4", "10", "0", "10", "20", "63"),
      new FrameValuesString("5", "0", "10", "10", "20", "83"),
      new FrameValuesString("6", "10", "6", "2", "18", "101"),
      new FrameValuesString("7", "6", "2", "10", "8", "109"),
      new FrameValuesString("8", "10", "4", "6", "20", "129"),
      new FrameValuesString("9", "4", "6", "10", "20", "149"),
      new FrameValuesString("10", "10", "10", "-1", "-1", "-1"),
    ];
    glue.thenFrameValuesAre(objectList6);
    glue.givenFrameValuesAreAsPrevious();
    const objectList7: FrameDisplayString[] = [
      new FrameDisplayString("1", "5", "/", "", "14"),
      new FrameDisplayString("2", "4", "5", "", "23"),
      new FrameDisplayString("3", "8", "/", "", "43"),
      new FrameDisplayString("4", "X", "", "", "63"),
      new FrameDisplayString("5", "-", "/", "", "83"),
      new FrameDisplayString("6", "X", "", "", "101"),
      new FrameDisplayString("7", "6", "2", "", "109"),
      new FrameDisplayString("8", "X", "", "", "129"),
      new FrameDisplayString("9", "4", "/", "", "149"),
      new FrameDisplayString("10", "X", "X", "", ""),
    ];
    glue.thenDisplayValuesAre(objectList7);
    const stringListList8: string[][] = [
      ["false"],
    ];
    glue.thenGameCompleteIs(stringListList8);
    const objectList9: InputControlValuesString[] = [
      new InputControlValuesString("10", "3", "10"),
    ];
    glue.thenInputControlIs(objectList9);
  });

  test("Scenario Check for Game Complete", () => {
    const glue = new BowlingGlue();
    const stringListList10: string[][] = [
      ["5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10", "10"],
    ];
    glue.givenRollsAre(stringListList10);
    glue.whenScored();
    const stringListList11: string[][] = [
      ["true"],
    ];
    glue.thenGameCompleteIs(stringListList11);
  });

  test("Scenario Values for Tenth Frame", () => {
    const glue = new BowlingGlue();
    const stringListList12: string[][] = [
      ["10", "10"],
    ];
    glue.givenRollsForTenthFrameAre(stringListList12);
    glue.whenScored();
    const objectList13: FrameValuesString[] = [
      new FrameValuesString("10", "10", "10", "-1", "-1", "-1"),
    ];
    glue.thenThenTenthFrameValuesAre(objectList13);
  });

  test("Scenario Input Control Should Be For Next Frame", () => {
    const glue = new BowlingGlue();
    const stringListList14: string[][] = [
      ["10"],
    ];
    glue.givenRollsAre(stringListList14);
    glue.whenScored();
    const objectList15: InputControlValuesString[] = [
      new InputControlValuesString("2", "1", "10"),
    ];
    glue.thenInputControlIs(objectList15);
  });

  test("Scenario Try to add invalid roll", () => {
    const glue = new BowlingGlue();
    const stringListList16: string[][] = [
      ["5"],
    ];
    glue.givenRollsAre(stringListList16);
    glue.whenScored();
    const stringListList17: string[][] = [
      ["6"],
    ];
    glue.whenRollIs(stringListList17);
    const stringListList18: string[][] = [
      ["5"],
    ];
    glue.thenRollsBecome(stringListList18);
  });

  test("DataType Pins", () => {
    const glue = new BowlingGlue();
    const objectList19: ValidValuesString[] = [
      new ValidValuesString("0", "true", ""),
      new ValidValuesString("10", "true", ""),
      new ValidValuesString("11", "false", ""),
      new ValidValuesString("-2", "false", ""),
      new ValidValuesString("-1", "true", "Used for To Be Rolled"),
    ];
    glue.examplesDataTypePins(objectList19);
  });

  test("DataType Score", () => {
    const glue = new BowlingGlue();
    const objectList20: ValidValuesString[] = [
      new ValidValuesString("0", "yes", ""),
      new ValidValuesString("300", "yes", ""),
      new ValidValuesString("301", "no", ""),
      new ValidValuesString("-1", "yes", "To be scored"),
    ];
    glue.examplesDataTypeScore(objectList20);
  });

});
