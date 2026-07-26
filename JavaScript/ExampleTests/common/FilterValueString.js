
export class FilterValueString {
  static DNC_STRING = "?DNC?";

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

  equals(other) {
    if (!(other instanceof FilterValueString)) return false;
    return (this.value === FilterValueString.DNC_STRING || other.value === FilterValueString.DNC_STRING || this.value === other.value);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
