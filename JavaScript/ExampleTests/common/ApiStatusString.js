import * as tokens from "./tokens.js";

export class ApiStatusString {
  static DNC_STRING = "?DNC?";

  constructor(code = "") {
    this.code = code;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ApiStatusString(
      v[0] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 1, "ApiStatus");
    return new ApiStatusString(
      parts[0]
    );
  }

  toString() {
    return tokens.token(this.code);
  }

  equals(other) {
    if (!(other instanceof ApiStatusString)) return false;
    return (this.code === ApiStatusString.DNC_STRING || other.code === ApiStatusString.DNC_STRING || this.code === other.code);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
