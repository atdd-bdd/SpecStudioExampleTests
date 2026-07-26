
export class ShippingString {
  static readonly DNC_STRING = "?DNC?";

  totalPrice: string;
  shippingCost: string;
  notes: string;

  constructor(totalPrice: string = "", shippingCost: string = "", notes: string = "") {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromList(values: Iterable<string>): ShippingString {
    const v = Array.from(values);
    const r = new ShippingString();
    r.totalPrice = v[0] ?? "";
    r.shippingCost = v[1] ?? "";
    r.notes = v[2] ?? "";
    return r;
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Shipping Cost=${this.shippingCost}, Notes=${this.notes}`;
  }

  equals(other: ShippingString): boolean {
    return (this.totalPrice === ShippingString.DNC_STRING || other.totalPrice === ShippingString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.shippingCost === ShippingString.DNC_STRING || other.shippingCost === ShippingString.DNC_STRING || this.shippingCost === other.shippingCost)
      && (this.notes === ShippingString.DNC_STRING || other.notes === ShippingString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a: ShippingString[], b: ShippingString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
