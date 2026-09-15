import * as tokens from "./tokens.js";

export class ResultString {
  static DNC_STRING = "?DNC?";

  constructor(addressMatches = "") {
    this.addressMatches = addressMatches;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ResultString(
      v[0] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 1, "Result");
    return new ResultString(
      parts[0]
    );
  }

  toString() {
    return tokens.token(this.addressMatches);
  }

  equals(other) {
    if (!(other instanceof ResultString)) return false;
    return (this.addressMatches === ResultString.DNC_STRING || other.addressMatches === ResultString.DNC_STRING || this.addressMatches === other.addressMatches);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
