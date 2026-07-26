import { OrderItemString } from "./OrderItemString.js";
import * as _json from "./json.js";

export class OrderItemTyped {
  name: SimpleText;
  quantity: number;
  price: Dollar;
  itemTotal: Dollar;

  constructor(name: SimpleText, quantity: number, price: Dollar, itemTotal: Dollar) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static fromStringObj(s: OrderItemString): OrderItemTyped {
    return new OrderItemTyped(
      new SimpleText(s.name),
      s.quantity !== "" ? Number(s.quantity) : 0,
      new Dollar(s.price),
      new Dollar(s.itemTotal)
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      name: this.name == null ? null : String(this.name),
      quantity: this.quantity,
      price: this.price == null ? null : String(this.price),
      itemTotal: this.itemTotal == null ? null : String(this.itemTotal),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): OrderItemTyped {
    return new OrderItemTyped(
      new SimpleText(_json.asString(_json.requireField(m, "name"), "name")),
      _json.asInt(_json.requireField(m, "quantity"), "quantity"),
      new Dollar(_json.asString(_json.requireField(m, "price"), "price")),
      new Dollar(_json.asString(_json.requireField(m, "itemTotal"), "itemTotal"))
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
}
