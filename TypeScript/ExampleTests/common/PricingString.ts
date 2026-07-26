
export class PricingString {
  totalPrice: string;

  constructor(totalPrice: string = "") {
    this.totalPrice = totalPrice;
  }

  static fromList(values: Iterable<string>): PricingString {
    const v = Array.from(values);
    return new PricingString(
      v[0] ?? ""
    );
  }

  toString(): string {
    return `TotalPrice=${this.totalPrice}`;
  }
}
