
import * as tokens from "./tokens.js";

export class FilterValueString {
  static readonly DNC_STRING = "?DNC?";

  value: string;

  constructor(value: string = "") {
    this.value = value;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): FilterValueString {
    const parts = tokens.require_(text, 1, "FilterValue");
    return new FilterValueString(
      parts[0]
    );
  }

  static fromList(values: Iterable<string>): FilterValueString {
    const v = Array.from(values);
    const r = new FilterValueString();
    r.value = v[0] ?? "";
    return r;
  }

  toString(): string {
    return `Value=${this.value}`;
  }

  equals(other: FilterValueString): boolean {
    return (this.value === FilterValueString.DNC_STRING || other.value === FilterValueString.DNC_STRING || this.value === other.value);
  }

  static equalLists(a: FilterValueString[], b: FilterValueString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
