
export class OrderItemString {
  name: string;
  quantity: string;
  price: string;
  itemTotal: string;

  constructor(name: string = "", quantity: string = "", price: string = "", itemTotal: string = "") {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static fromList(values: Iterable<string>): OrderItemString {
    const v = Array.from(values);
    return new OrderItemString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? ""
    );
  }

  toString(): string {
    return `Name=${this.name}, Quantity=${this.quantity}, Price=${this.price}, ItemTotal=${this.itemTotal}`;
  }
}
