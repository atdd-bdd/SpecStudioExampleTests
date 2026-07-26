
export class FilterValueString {
  value: string;

  constructor(value: string = "") {
    this.value = value;
  }

  static fromList(values: Iterable<string>): FilterValueString {
    const v = Array.from(values);
    return new FilterValueString(
      v[0] ?? ""
    );
  }

  toString(): string {
    return `Value=${this.value}`;
  }
}
