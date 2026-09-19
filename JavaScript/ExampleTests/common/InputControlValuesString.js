import * as tokens from "./tokens.js";

export class InputControlValuesString {
  static DNC_STRING = "?DNC?";

  constructor(frame = "", roll = "", remaining = "") {
    this.frame = frame;
    this.roll = roll;
    this.remaining = remaining;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new InputControlValuesString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 3, "InputControlValues");
    return new InputControlValuesString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  toString() {
    return tokens.token(this.frame) + " " + tokens.token(this.roll) + " " + tokens.token(this.remaining);
  }

  equals(other) {
    if (!(other instanceof InputControlValuesString)) return false;
    return (this.frame === InputControlValuesString.DNC_STRING || other.frame === InputControlValuesString.DNC_STRING || this.frame === other.frame)
      && (this.roll === InputControlValuesString.DNC_STRING || other.roll === InputControlValuesString.DNC_STRING || this.roll === other.roll)
      && (this.remaining === InputControlValuesString.DNC_STRING || other.remaining === InputControlValuesString.DNC_STRING || this.remaining === other.remaining);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
