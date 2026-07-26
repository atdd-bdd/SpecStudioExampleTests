
export class ValidValuesString {
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
    return new ValidValuesString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString(): string {
    return `Value=${this.value}, IsValid=${this.isValid}, Notes=${this.notes}`;
  }
}
