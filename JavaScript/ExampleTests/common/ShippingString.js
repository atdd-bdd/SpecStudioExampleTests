
export class ShippingString {
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
}
