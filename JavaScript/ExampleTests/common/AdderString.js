import * as tokens from "./tokens.js";

export class AdderString {
  static DNC_STRING = "?DNC?";

  constructor(number1 = "", number2 = "", result = "") {
    this.number1 = number1;
    this.number2 = number2;
    this.result = result;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new AdderString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 3, "Adder");
    return new AdderString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  toString() {
    return tokens.token(this.number1) + " " + tokens.token(this.number2) + " " + tokens.token(this.result);
  }

  equals(other) {
    if (!(other instanceof AdderString)) return false;
    return (this.number1 === AdderString.DNC_STRING || other.number1 === AdderString.DNC_STRING || this.number1 === other.number1)
      && (this.number2 === AdderString.DNC_STRING || other.number2 === AdderString.DNC_STRING || this.number2 === other.number2)
      && (this.result === AdderString.DNC_STRING || other.result === AdderString.DNC_STRING || this.result === other.result);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
