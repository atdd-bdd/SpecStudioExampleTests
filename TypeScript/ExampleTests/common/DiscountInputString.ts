
export class DiscountInputString {
  static readonly DNC_STRING = "?DNC?";

  totalPrice: string;
  discount: string;
  notes: string;

  constructor(totalPrice: string = "", discount: string = "", notes: string = "") {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromList(values: Iterable<string>): DiscountInputString {
    const v = Array.from(values);
    const r = new DiscountInputString();
    r.totalPrice = v[0] ?? "";
    r.discount = v[1] ?? "";
    r.notes = v[2] ?? "";
    return r;
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Discount=${this.discount}, Notes=${this.notes}`;
  }

  equals(other: DiscountInputString): boolean {
    return (this.totalPrice === DiscountInputString.DNC_STRING || other.totalPrice === DiscountInputString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.discount === DiscountInputString.DNC_STRING || other.discount === DiscountInputString.DNC_STRING || this.discount === other.discount)
      && (this.notes === DiscountInputString.DNC_STRING || other.notes === DiscountInputString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a: DiscountInputString[], b: DiscountInputString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
