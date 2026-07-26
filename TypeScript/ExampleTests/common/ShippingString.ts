
export class ShippingString {
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
    return new ShippingString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Shipping Cost=${this.shippingCost}, Notes=${this.notes}`;
  }
}
