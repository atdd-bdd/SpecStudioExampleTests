
export class OrderItemString {
  constructor(name = "", quantity = "", price = "", itemTotal = "") {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new OrderItemString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  toString() {
    return `Name=${this.name}, Quantity=${this.quantity}, Price=${this.price}, ItemTotal=${this.itemTotal}`;
  }
}
