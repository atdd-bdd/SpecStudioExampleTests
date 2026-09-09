import * as tokens from "./tokens.js";

export class SimpleClassString {
  static DNC_STRING = "?DNC?";

  constructor(anInt = "", aString = "") {
    this.anInt = anInt;
    this.aString = aString;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new SimpleClassString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 2, "SimpleClass");
    return new SimpleClassString(
      parts[0],
      parts[1]
    );
  }

  toString() {
    return tokens.token(this.anInt) + " " + tokens.token(this.aString);
  }

  equals(other) {
    if (!(other instanceof SimpleClassString)) return false;
    return (this.anInt === SimpleClassString.DNC_STRING || other.anInt === SimpleClassString.DNC_STRING || this.anInt === other.anInt)
      && (this.aString === SimpleClassString.DNC_STRING || other.aString === SimpleClassString.DNC_STRING || this.aString === other.aString);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
