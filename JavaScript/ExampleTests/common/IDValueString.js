import * as tokens from "./tokens.js";

export class IDValueString {
  static DNC_STRING = "?DNC?";

  constructor(iD = "", value = "") {
    this.iD = iD;
    this.value = value;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new IDValueString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 2, "IDValue");
    return new IDValueString(
      parts[0],
      parts[1]
    );
  }

  toString() {
    return tokens.token(this.iD) + " " + tokens.token(this.value);
  }

  equals(other) {
    if (!(other instanceof IDValueString)) return false;
    return (this.iD === IDValueString.DNC_STRING || other.iD === IDValueString.DNC_STRING || this.iD === other.iD)
      && (this.value === IDValueString.DNC_STRING || other.value === IDValueString.DNC_STRING || this.value === other.value);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
