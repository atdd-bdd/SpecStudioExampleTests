
export class DiscountingString {
  static DNC_STRING = "?DNC?";

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

  equals(other) {
    if (!(other instanceof DiscountingString)) return false;
    return (this.totalPrice === DiscountingString.DNC_STRING || other.totalPrice === DiscountingString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.discount === DiscountingString.DNC_STRING || other.discount === DiscountingString.DNC_STRING || this.discount === other.discount)
      && (this.notes === DiscountingString.DNC_STRING || other.notes === DiscountingString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
