
export class DiscountingString {
  constructor(totalPrice = "", discount = "", notes = "") {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new DiscountingString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString() {
    return `Total Price=${this.totalPrice}, Discount=${this.discount}, Notes=${this.notes}`;
  }
}
