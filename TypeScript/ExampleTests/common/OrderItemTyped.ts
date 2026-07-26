import { OrderItemString } from "./OrderItemString.js";
import * as _json from "./json.js";

export class OrderItemTyped {
  name: string;
  quantity: number;
  price: string;
  itemTotal: string;

  constructor(name: string, quantity: number, price: string, itemTotal: string) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static fromStringObj(s: OrderItemString): OrderItemTyped {
    return new OrderItemTyped(
      s.name,
      s.quantity !== "" ? Number(s.quantity) : 0,
      s.price,
      s.itemTotal
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      name: this.name,
      quantity: this.quantity,
      price: this.price,
      itemTotal: this.itemTotal,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): OrderItemTyped {
    return new OrderItemTyped(
      _json.asString(_json.requireField(m, "name"), "name"),
      _json.asInt(_json.requireField(m, "quantity"), "quantity"),
      _json.asString(_json.requireField(m, "price"), "price"),
      _json.asString(_json.requireField(m, "itemTotal"), "itemTotal")
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
    return this.name === other.name
      && this.quantity === other.quantity
      && this.price === other.price
      && this.itemTotal === other.itemTotal;
  }
}
