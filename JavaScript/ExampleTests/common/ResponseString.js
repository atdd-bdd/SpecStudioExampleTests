import { ResultString } from "./ResultString.js";
import * as tokens from "./tokens.js";

export class ResponseString {
  static DNC_STRING = "?DNC?";

  constructor(result = "") {
    this.result = result;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ResponseString(
      v[0] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 1, "Response");
    return new ResponseString(
      ResultString.fromText(parts[0])
    );
  }

  toString() {
    return tokens.nested(String(this.result));
  }

  equals(other) {
    if (!(other instanceof ResponseString)) return false;
    return this.result.equals(other.result);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
