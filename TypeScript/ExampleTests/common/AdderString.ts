
export class AdderString {
  number1: string;
  number2: string;
  result: string;

  constructor(number1: string = "", number2: string = "", result: string = "") {
    this.number1 = number1;
    this.number2 = number2;
    this.result = result;
  }

  static fromList(values: Iterable<string>): AdderString {
    const v = Array.from(values);
    return new AdderString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString(): string {
    return `number1=${this.number1}, number2=${this.number2}, result=${this.result}`;
  }
}
