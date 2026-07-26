
export class FilterValueString {
  constructor(value = "") {
    this.value = value;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new FilterValueString(
      v[0] ?? ""
    );
  }

  toString() {
    return `Value=${this.value}`;
  }
}
