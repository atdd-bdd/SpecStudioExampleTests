
export class DiscountingString {
  static readonly DNC_STRING = "?DNC?";

  totalPrice: string;
  discount: string;
  notes: string;

  constructor(totalPrice: string = "", discount: string = "", notes: string = "") {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromList(values: Iterable<string>): DiscountingString {
    const v = Array.from(values);
    const r = new DiscountingString();
    r.totalPrice = v[0] ?? "";
    r.discount = v[1] ?? "";
    r.notes = v[2] ?? "";
    return r;
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Discount=${this.discount}, Notes=${this.notes}`;
  }

  equals(other: DiscountingString): boolean {
    return (this.totalPrice === DiscountingString.DNC_STRING || other.totalPrice === DiscountingString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.discount === DiscountingString.DNC_STRING || other.discount === DiscountingString.DNC_STRING || this.discount === other.discount)
      && (this.notes === DiscountingString.DNC_STRING || other.notes === DiscountingString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a: DiscountingString[], b: DiscountingString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
