import * as tokens from "./tokens.js";

export class PatchTitleString {
  static DNC_STRING = "?DNC?";

  constructor(title = "") {
    this.title = title;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new PatchTitleString(
      v[0] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 1, "PatchTitle");
    return new PatchTitleString(
      parts[0]
    );
  }

  toString() {
    return tokens.token(this.title);
  }

  equals(other) {
    if (!(other instanceof PatchTitleString)) return false;
    return (this.title === PatchTitleString.DNC_STRING || other.title === PatchTitleString.DNC_STRING || this.title === other.title);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
