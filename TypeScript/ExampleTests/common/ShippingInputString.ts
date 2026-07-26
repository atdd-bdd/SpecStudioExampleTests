
export class ShippingInputString {
  static readonly DNC_STRING = "?DNC?";

  totalPrice: string;
  shippingCost: string;
  notes: string;

  constructor(totalPrice: string = "", shippingCost: string = "", notes: string = "") {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromList(values: Iterable<string>): ShippingInputString {
    const v = Array.from(values);
    const r = new ShippingInputString();
    r.totalPrice = v[0] ?? "";
    r.shippingCost = v[1] ?? "";
    r.notes = v[2] ?? "";
    return r;
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Shipping Cost=${this.shippingCost}, Notes=${this.notes}`;
  }

  equals(other: ShippingInputString): boolean {
    return (this.totalPrice === ShippingInputString.DNC_STRING || other.totalPrice === ShippingInputString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.shippingCost === ShippingInputString.DNC_STRING || other.shippingCost === ShippingInputString.DNC_STRING || this.shippingCost === other.shippingCost)
      && (this.notes === ShippingInputString.DNC_STRING || other.notes === ShippingInputString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a: ShippingInputString[], b: ShippingInputString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
