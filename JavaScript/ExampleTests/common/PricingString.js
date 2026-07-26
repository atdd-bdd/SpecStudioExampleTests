
export class PricingString {
  static DNC_STRING = "?DNC?";

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

  equals(other) {
    if (!(other instanceof PricingString)) return false;
    return (this.totalPrice === PricingString.DNC_STRING || other.totalPrice === PricingString.DNC_STRING || this.totalPrice === other.totalPrice);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
