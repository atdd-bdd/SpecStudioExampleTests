import { AdderString, ApiRequestString, ApiStatusString, CartInputString, DiscountInputString, FandCString, NewPostString, PatchTitleString, PostString, ReplacePostString, ShippingInputString, ValidValuesString } from "./common/index.js";
import { APIGlue } from "./aPI_glue.js";

describe("API", () => {

  test("Scenario Retrieve a single post", () => {
    const glue = new APIGlue();
    const stringListList1: string[][] = [
      ["https://jsonplaceholder.typicode.com"],
    ];
    glue.givenBasePageIs(stringListList1);
    const objectList2: ApiRequestString[] = [
      new ApiRequestString("GET", "posts", "1", ""),
    ];
    glue.whenSendingRequest(objectList2);
    const objectList3: ApiStatusString[] = [
      new ApiStatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList3);
    const objectList4: PostString[] = [
      new PostString("1", "1", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"),
    ];
    glue.thenResponseBodyIs(objectList4);
  });

  test("Scenario Retrieve all posts", () => {
    const glue = new APIGlue();
    const stringListList5: string[][] = [
      ["https://jsonplaceholder.typicode.com"],
    ];
    glue.givenBasePageIs(stringListList5);
    const objectList6: ApiRequestString[] = [
      new ApiRequestString("GET", "posts", "", ""),
    ];
    glue.whenSendingRequest(objectList6);
    const objectList7: ApiStatusString[] = [
      new ApiStatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList7);
    const stringListList8: string[][] = [
      ["100"],
    ];
    glue.thenResponseArrayContainsThisManyItems(stringListList8);
  });

  test("Scenario Create a new post", () => {
    const glue = new APIGlue();
    const stringListList9: string[][] = [
      ["https://jsonplaceholder.typicode.com"],
    ];
    glue.givenBasePageIs(stringListList9);
    const objectList10: NewPostString[] = [
      new NewPostString("AlignThree Demo", "Testing POST", "7"),
    ];
    glue.givenNewPostData(objectList10);
    const objectList11: ApiRequestString[] = [
      new ApiRequestString("POST", "posts", "", "NewPost"),
    ];
    glue.whenSendingRequest(objectList11);
    const objectList12: ApiStatusString[] = [
      new ApiStatusString("201"),
    ];
    glue.thenResponseStatusIs(objectList12);
    const objectList13: PostString[] = [
      new PostString("7", "101", "AlignThree Demo", "Testing POST"),
    ];
    glue.thenResponseBodyIs(objectList13);
  });

  test("Scenario Replace an existing post", () => {
    const glue = new APIGlue();
    const stringListList14: string[][] = [
      ["https://jsonplaceholder.typicode.com"],
    ];
    glue.givenBasePageIs(stringListList14);
    const objectList15: ReplacePostString[] = [
      new ReplacePostString("1", "1", "Replaced Title", "Replaced Body"),
    ];
    glue.givenReplacementData(objectList15);
    const objectList16: ApiRequestString[] = [
      new ApiRequestString("PUT", "posts", "1", "ReplacePost"),
    ];
    glue.whenSendingRequest(objectList16);
    const objectList17: ApiStatusString[] = [
      new ApiStatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList17);
    const objectList18: PostString[] = [
      new PostString("1", "1", "Replaced Title", "Replaced Body"),
    ];
    glue.thenResponseBodyIs(objectList18);
  });

  test("Scenario Update a post title", () => {
    const glue = new APIGlue();
    const stringListList19: string[][] = [
      ["https://jsonplaceholder.typicode.com"],
    ];
    glue.givenBasePageIs(stringListList19);
    const objectList20: PatchTitleString[] = [
      new PatchTitleString("Patched Title"),
    ];
    glue.givenPatchData(objectList20);
    const objectList21: ApiRequestString[] = [
      new ApiRequestString("PATCH", "posts", "1", "PatchTitle"),
    ];
    glue.whenSendingRequest(objectList21);
    const objectList22: ApiStatusString[] = [
      new ApiStatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList22);
    const objectList23: PostString[] = [
      new PostString("1", "1", "Patched Title", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"),
    ];
    glue.thenResponseBodyIs(objectList23);
  });

  test("Scenario Delete a post", () => {
    const glue = new APIGlue();
    const stringListList24: string[][] = [
      ["https://jsonplaceholder.typicode.com"],
    ];
    glue.givenBasePageIs(stringListList24);
    const objectList25: ApiRequestString[] = [
      new ApiRequestString("DELETE", "posts", "1", ""),
    ];
    glue.whenSendingRequest(objectList25);
    const objectList26: ApiStatusString[] = [
      new ApiStatusString("200"),
    ];
    glue.thenResponseStatusIs(objectList26);
  });

});
