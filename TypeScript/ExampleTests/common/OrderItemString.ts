
export class OrderItemString {
  static readonly DNC_STRING = "?DNC?";

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
    const r = new OrderItemString();
    r.name = v[0] ?? "";
    r.quantity = v[1] ?? "";
    r.price = v[2] ?? "";
    r.itemTotal = v[3] ?? "";
    return r;
  }

  toString(): string {
    return `Name=${this.name}, Quantity=${this.quantity}, Price=${this.price}, ItemTotal=${this.itemTotal}`;
  }

  equals(other: OrderItemString): boolean {
    return (this.name === OrderItemString.DNC_STRING || other.name === OrderItemString.DNC_STRING || this.name === other.name)
      && (this.quantity === OrderItemString.DNC_STRING || other.quantity === OrderItemString.DNC_STRING || this.quantity === other.quantity)
      && (this.price === OrderItemString.DNC_STRING || other.price === OrderItemString.DNC_STRING || this.price === other.price)
      && (this.itemTotal === OrderItemString.DNC_STRING || other.itemTotal === OrderItemString.DNC_STRING || this.itemTotal === other.itemTotal);
  }

  static equalLists(a: OrderItemString[], b: OrderItemString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
