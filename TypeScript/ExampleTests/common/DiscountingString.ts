
export class DiscountingString {
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
    return new DiscountingString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Discount=${this.discount}, Notes=${this.notes}`;
  }
}
