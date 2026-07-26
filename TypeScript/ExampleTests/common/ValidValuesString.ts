
export class ValidValuesString {
  static readonly DNC_STRING = "?DNC?";

  value: string;
  isValid: string;
  notes: string;

  constructor(value: string = "", isValid: string = "", notes: string = "") {
    this.value = value;
    this.isValid = isValid;
    this.notes = notes;
  }

  static fromList(values: Iterable<string>): ValidValuesString {
    const v = Array.from(values);
    const r = new ValidValuesString();
    r.value = v[0] ?? "";
    r.isValid = v[1] ?? "";
    r.notes = v[2] ?? "";
    return r;
  }

  toString(): string {
    return `Value=${this.value}, IsValid=${this.isValid}, Notes=${this.notes}`;
  }

  equals(other: ValidValuesString): boolean {
    return (this.value === ValidValuesString.DNC_STRING || other.value === ValidValuesString.DNC_STRING || this.value === other.value)
      && (this.isValid === ValidValuesString.DNC_STRING || other.isValid === ValidValuesString.DNC_STRING || this.isValid === other.isValid)
      && (this.notes === ValidValuesString.DNC_STRING || other.notes === ValidValuesString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a: ValidValuesString[], b: ValidValuesString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
