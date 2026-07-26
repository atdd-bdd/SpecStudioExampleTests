
export class PricingString {
  static readonly DNC_STRING = "?DNC?";

  totalPrice: string;

  constructor(totalPrice: string = "") {
    this.totalPrice = totalPrice;
  }

  static fromList(values: Iterable<string>): PricingString {
    const v = Array.from(values);
    const r = new PricingString();
    r.totalPrice = v[0] ?? "";
    return r;
  }

  toString(): string {
    return `TotalPrice=${this.totalPrice}`;
  }

  equals(other: PricingString): boolean {
    return (this.totalPrice === PricingString.DNC_STRING || other.totalPrice === PricingString.DNC_STRING || this.totalPrice === other.totalPrice);
  }

  static equalLists(a: PricingString[], b: PricingString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
