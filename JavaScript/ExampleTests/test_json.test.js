import { AdderString, CartInputString, DiscountInputString, FandCString, ShippingInputString, SimpleClassString, ValidValuesString } from "./common/index.js";
import { JsonGlue } from "./json_glue.js";

describe("Json", () => {

  test("Scenario Convert to Json", () => {
    const glue = new JsonGlue();
    const objectList1 = [
      new SimpleClassString("1", "B"),
    ];
    glue.givenOneObjectIs(objectList1);
    glue.thenJsonShouldBe("{anInt:\"1\",aString:\"B\"}");
  });

  test("Scenario Convert from Json", () => {
    const glue = new JsonGlue();
    glue.givenJsonIs("{anInt:  \"1\"   ,   aString:\"B\"  }");
    const objectList2 = [
      new SimpleClassString("1", "B"),
    ];
    glue.thenTheConvertedObjectIs(objectList2);
  });

  test("Scenario Convert to Json Array", () => {
    const glue = new JsonGlue();
    const objectList3 = [
      new SimpleClassString("1", "B"),
      new SimpleClassString("2", "C"),
    ];
    glue.givenATableIs(objectList3);
    glue.thenJsonForTableShouldBe("[ {anInt:\"1\",aString:\"B\"} \n, {anInt:\"2\",aString:\"C\"} \n]");
  });

  test("Scenario Convert from Json Array", () => {
    const glue = new JsonGlue();
    glue.givenJsonForTableIs("[    {anInt:  \"1\"   ,   aString:\"B\"  },\n{anInt:  \"2\"   ,   aString:\"C\"  }\n]\n");
    const objectList4 = [
      new SimpleClassString("1", "B"),
      new SimpleClassString("2", "C"),
    ];
    glue.thenTheConvertedTableShouldBe(objectList4);
  });

});
