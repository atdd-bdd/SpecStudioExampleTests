
export class PricingString {
  constructor(totalPrice = "") {
    this.totalPrice = totalPrice;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new PricingString(
      v[0] ?? ""
    );
  }

  toString() {
    return `TotalPrice=${this.totalPrice}`;
  }
}
