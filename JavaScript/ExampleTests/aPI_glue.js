import { NewPostTyped, PatchTitleTyped, PostTyped, ReplacePostTyped, ApiRequestTyped, ApiStatusTyped } from "./common/index.js";
import { RestCall } from "./rest_call.js";

const DNC_STRING = "?DNC?";


/**
 * Exercises a live REST API over HTTP.
 *
 * There are no production classes behind this one: the API itself is the thing
 * under test. RestCall does the transport, so what is left here is only the
 * three things glue should do -- turn a table into JSON with the generated
 * toJSON(), turn the response JSON back into a table with the generated
 * fromJSONValue(), and compare.
 *
 * The status and the body are separate steps because they come from separate
 * places. Keeping them apart is what lets the body go straight through the
 * generated reader: while a status was mixed into the body's attribute set, the
 * reader demanded a "status" field no API response ever contains.
 */
export class APIGlue {
  static DNC_STRING = DNC_STRING;

  #basePage = "";

  /** Bodies offered by Given steps, keyed by the attribute set that carried them. */
  #bodies = new Map();

  #call = undefined;

  // ---- given -----------------------------------------------------------

  givenBasePageIs(values) {
    for (const row of values)
      for (const cell of row)
        if (cell.trim() !== "") this.#basePage = cell.trim();

    expect(this.#basePage).not.toBe("");
  }

  givenNewPostData(values) {
    for (const value of values)
      this.#bodies.set("NewPost", NewPostTyped.fromStringObj(value).toJSON());
  }

  givenReplacementData(values) {
    for (const value of values)
      this.#bodies.set("ReplacePost", ReplacePostTyped.fromStringObj(value).toJSON());
  }

  givenPatchData(values) {
    for (const value of values)
      this.#bodies.set("PatchTitle", PatchTitleTyped.fromStringObj(value).toJSON());
  }

  // ---- when ------------------------------------------------------------

  whenSendingRequest(values) {
    for (const value of values) {
      const request = ApiRequestTyped.fromStringObj(value);

      // Body names an attribute set a Given step already turned into JSON.
      const bodyName = String(request.body ?? "").trim();
      let payload = "";
      if (bodyName !== "") {
        expect(`body named ${bodyName}: ${this.#bodies.has(bodyName)}`)
          .toBe(`body named ${bodyName}: true`);
        payload = this.#bodies.get(bodyName);
      }

      this.#call = RestCall.send(request.method, this.#basePage,
                                 request.page, request.parameter, payload);
    }
  }

  // ---- then ------------------------------------------------------------

  thenResponseStatusIs(values) {
    this.#requireCall();

    for (const expected of values) {
      const want = ApiStatusTyped.fromStringObj(expected).code;
      expect(`status from ${this.#call.url}: ${this.#call.status}`)
        .toBe(`status from ${this.#call.url}: ${want}`);
    }
  }

  thenResponseBodyIs(values) {
    this.#requireCall();

    const actual = PostTyped.fromJSON(this.#call.body);

    for (const expected of values) comparePost("", expected, actual);
  }

  thenResponseArrayContainsThisManyItems(values) {
    this.#requireCall();

    const expected = Number(values[0][0].trim());
    const items = PostTyped.fromJSONList(this.#call.body);

    expect(`items from ${this.#call.url}: ${items.length}`)
      .toBe(`items from ${this.#call.url}: ${expected}`);
  }

  // ---- helpers ---------------------------------------------------------

  #requireCall() {
    expect(`a request was sent: ${this.#call !== undefined}`)
      .toBe("a request was sent: true");
  }
}

/**
 * One expected row against one returned post.
 *
 * A table that states every column is compared typed, so that the values are
 * checked as the types the specification declares and not merely as matching
 * text. A CompareOnly table cannot be: its unstated columns hold ?DNC?, which
 * has no typed meaning, and only the String class knows to skip it. So that
 * case compares the string form of both sides instead.
 */
function comparePost(where, expected, actual) {
  if (statesEveryColumn(expected)) {
    const want = PostTyped.fromStringObj(expected);
    expect(`${where}post: ${actual}`).toBe(`${where}post: ${want}`);
  } else {
    const got = actual.toStringObj();
    expect(`${where}post: ${got}`).toBe(`${where}post: ${expected}`);
  }
}

/** False when any column was left to CompareOnly, and so holds ?DNC?. */
function statesEveryColumn(row) {
  return row.userId !== DNC_STRING && row.id !== DNC_STRING
      && row.title !== DNC_STRING && row.body !== DNC_STRING;
}
