import { OrderItemString } from "./OrderItemString.js";
import * as _json from "./json.js";
import { SimpleTextTyped } from "./SimpleTextTyped.js";
import { DollarTyped } from "./DollarTyped.js";

export class OrderItemTyped {
  name: SimpleTextTyped;
  quantity: number;
  price: DollarTyped;
  itemTotal: DollarTyped;

  constructor(name: SimpleTextTyped, quantity: number, price: DollarTyped, itemTotal: DollarTyped) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static fromStringObj(s: OrderItemString): OrderItemTyped {
    return new OrderItemTyped(
      new SimpleTextTyped(s.name),
      s.quantity !== "" ? Number(s.quantity) : 0,
      new DollarTyped(s.price),
      new DollarTyped(s.itemTotal)
    );
  }

  toStringObj(): OrderItemString {
    return new OrderItemString(
      String(this.name),
      String(this.quantity),
      String(this.price),
      String(this.itemTotal)
    );
  }

  static toStringList(list: OrderItemTyped[]): OrderItemString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: OrderItemString[]): OrderItemTyped[] {
    return list.map(s => OrderItemTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      name: String(this.name),
      quantity: this.quantity,
      price: String(this.price),
      itemTotal: String(this.itemTotal),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): OrderItemTyped {
    return new OrderItemTyped(
      new SimpleTextTyped(_json.asString(_json.requireField(m, "name"), "name")),
      _json.asInt(_json.requireField(m, "quantity"), "quantity"),
      new DollarTyped(_json.asString(_json.requireField(m, "price"), "price")),
      new DollarTyped(_json.asString(_json.requireField(m, "itemTotal"), "itemTotal"))
    );
  }

  static fromJSON(text: string): OrderItemTyped {
    return OrderItemTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly OrderItemTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): OrderItemTyped[] {
    const raw = _json.asArray(_json.parse(text), "OrderItemTyped") ?? [];
    return raw.map((e) => OrderItemTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Name=${this.name}, Quantity=${this.quantity}, Price=${this.price}, ItemTotal=${this.itemTotal}`;
  }

  equals(other: OrderItemTyped): boolean {
    return this.name.equals(other.name)
      && this.quantity === other.quantity
      && this.price.equals(other.price)
      && this.itemTotal.equals(other.itemTotal);
  }
}
