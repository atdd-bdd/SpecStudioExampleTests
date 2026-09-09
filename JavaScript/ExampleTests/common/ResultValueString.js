import * as tokens from "./tokens.js";

export class ResultValueString {
  static DNC_STRING = "?DNC?";

  constructor(sum = "") {
    this.sum = sum;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ResultValueString(
      v[0] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 1, "ResultValue");
    return new ResultValueString(
      parts[0]
    );
  }

  toString() {
    return tokens.token(this.sum);
  }

  equals(other) {
    if (!(other instanceof ResultValueString)) return false;
    return (this.sum === ResultValueString.DNC_STRING || other.sum === ResultValueString.DNC_STRING || this.sum === other.sum);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
