
export class AdderString {
  constructor(number1 = "", number2 = "", result = "") {
    this.number1 = number1;
    this.number2 = number2;
    this.result = result;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new AdderString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString() {
    return `number1=${this.number1}, number2=${this.number2}, result=${this.result}`;
  }
}
