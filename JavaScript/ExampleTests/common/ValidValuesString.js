import * as tokens from "./tokens.js";

export class ValidValuesString {
  static DNC_STRING = "?DNC?";

  constructor(value = "", isValid = "", notes = "") {
    this.value = value;
    this.isValid = isValid;
    this.notes = notes;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ValidValuesString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 3, "ValidValues");
    return new ValidValuesString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  toString() {
    return tokens.token(this.value) + " " + tokens.token(this.isValid) + " " + tokens.token(this.notes);
  }

  equals(other) {
    if (!(other instanceof ValidValuesString)) return false;
    return (this.value === ValidValuesString.DNC_STRING || other.value === ValidValuesString.DNC_STRING || this.value === other.value)
      && (this.isValid === ValidValuesString.DNC_STRING || other.isValid === ValidValuesString.DNC_STRING || this.isValid === other.isValid)
      && (this.notes === ValidValuesString.DNC_STRING || other.notes === ValidValuesString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
