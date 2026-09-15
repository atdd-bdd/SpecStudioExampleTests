import * as tokens from "./tokens.js";

export class StatusString {
  static DNC_STRING = "?DNC?";

  constructor(code = "") {
    this.code = code;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new StatusString(
      v[0] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 1, "Status");
    return new StatusString(
      parts[0]
    );
  }

  toString() {
    return tokens.token(this.code);
  }

  equals(other) {
    if (!(other instanceof StatusString)) return false;
    return (this.code === StatusString.DNC_STRING || other.code === StatusString.DNC_STRING || this.code === other.code);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
