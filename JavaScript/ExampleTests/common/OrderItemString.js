
export class OrderItemString {
  static DNC_STRING = "?DNC?";

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

  equals(other) {
    if (!(other instanceof OrderItemString)) return false;
    return (this.name === OrderItemString.DNC_STRING || other.name === OrderItemString.DNC_STRING || this.name === other.name)
      && (this.quantity === OrderItemString.DNC_STRING || other.quantity === OrderItemString.DNC_STRING || this.quantity === other.quantity)
      && (this.price === OrderItemString.DNC_STRING || other.price === OrderItemString.DNC_STRING || this.price === other.price)
      && (this.itemTotal === OrderItemString.DNC_STRING || other.itemTotal === OrderItemString.DNC_STRING || this.itemTotal === other.itemTotal);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
