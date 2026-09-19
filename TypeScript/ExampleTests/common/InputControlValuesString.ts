
import * as tokens from "./tokens.js";

export class InputControlValuesString {
  static readonly DNC_STRING = "?DNC?";

  frame: string;
  roll: string;
  remaining: string;

  constructor(frame: string = "", roll: string = "", remaining: string = "") {
    this.frame = frame;
    this.roll = roll;
    this.remaining = remaining;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): InputControlValuesString {
    const parts = tokens.require_(text, 3, "InputControlValues");
    return new InputControlValuesString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  static fromList(values: Iterable<string>): InputControlValuesString {
    const v = Array.from(values);
    const r = new InputControlValuesString();
    r.frame = v[0] ?? "";
    r.roll = v[1] ?? "";
    r.remaining = v[2] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.frame) + " " + tokens.token(this.roll) + " " + tokens.token(this.remaining);
  }

  equals(other: InputControlValuesString): boolean {
    return (this.frame === InputControlValuesString.DNC_STRING || other.frame === InputControlValuesString.DNC_STRING || this.frame === other.frame)
      && (this.roll === InputControlValuesString.DNC_STRING || other.roll === InputControlValuesString.DNC_STRING || this.roll === other.roll)
      && (this.remaining === InputControlValuesString.DNC_STRING || other.remaining === InputControlValuesString.DNC_STRING || this.remaining === other.remaining);
  }

  static equalLists(a: InputControlValuesString[], b: InputControlValuesString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
