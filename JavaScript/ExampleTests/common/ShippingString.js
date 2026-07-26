
export class ShippingString {
  static DNC_STRING = "?DNC?";

  constructor(totalPrice = "", shippingCost = "", notes = "") {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ShippingString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString() {
    return `Total Price=${this.totalPrice}, Shipping Cost=${this.shippingCost}, Notes=${this.notes}`;
  }

  equals(other) {
    if (!(other instanceof ShippingString)) return false;
    return (this.totalPrice === ShippingString.DNC_STRING || other.totalPrice === ShippingString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.shippingCost === ShippingString.DNC_STRING || other.shippingCost === ShippingString.DNC_STRING || this.shippingCost === other.shippingCost)
      && (this.notes === ShippingString.DNC_STRING || other.notes === ShippingString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
