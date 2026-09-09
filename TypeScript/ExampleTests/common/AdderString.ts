
import * as tokens from "./tokens.js";

export class AdderString {
  static readonly DNC_STRING = "?DNC?";

  number1: string;
  number2: string;
  result: string;

  constructor(number1: string = "", number2: string = "", result: string = "") {
    this.number1 = number1;
    this.number2 = number2;
    this.result = result;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): AdderString {
    const parts = tokens.require_(text, 3, "Adder");
    return new AdderString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  static fromList(values: Iterable<string>): AdderString {
    const v = Array.from(values);
    const r = new AdderString();
    r.number1 = v[0] ?? "";
    r.number2 = v[1] ?? "";
    r.result = v[2] ?? "";
    return r;
  }

  toString(): string {
    return `number1=${this.number1}, number2=${this.number2}, result=${this.result}`;
  }

  equals(other: AdderString): boolean {
    return (this.number1 === AdderString.DNC_STRING || other.number1 === AdderString.DNC_STRING || this.number1 === other.number1)
      && (this.number2 === AdderString.DNC_STRING || other.number2 === AdderString.DNC_STRING || this.number2 === other.number2)
      && (this.result === AdderString.DNC_STRING || other.result === AdderString.DNC_STRING || this.result === other.result);
  }

  static equalLists(a: AdderString[], b: AdderString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
