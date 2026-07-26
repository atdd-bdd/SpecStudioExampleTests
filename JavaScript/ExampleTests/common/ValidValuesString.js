
export class ValidValuesString {
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

  toString() {
    return `Value=${this.value}, IsValid=${this.isValid}, Notes=${this.notes}`;
  }
}
