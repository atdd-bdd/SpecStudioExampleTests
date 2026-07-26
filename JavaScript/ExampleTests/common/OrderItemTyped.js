import { OrderItemString } from "./OrderItemString.js";
import * as _json from "./json.js";

export class OrderItemTyped {
  constructor(name = "", quantity = 0, price = "", itemTotal = "") {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.itemTotal = itemTotal;
  }

  static fromStringObj(s) {
    return new OrderItemTyped(
      s.name,
      s.quantity !== "" ? Number(s.quantity) : 0,
      s.price,
      s.itemTotal
    );
  }

  toJsonValue() {
    return {
      name: this.name == null ? null : String(this.name),
      quantity: this.quantity,
      price: this.price == null ? null : String(this.price),
      itemTotal: this.itemTotal == null ? null : String(this.itemTotal),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new OrderItemTyped(
      new SimpleText(_json.asString(_json.require(m, "name"), "name")),
      _json.asInt(_json.require(m, "quantity"), "quantity"),
      new Dollar(_json.asString(_json.require(m, "price"), "price")),
      new Dollar(_json.asString(_json.require(m, "itemTotal"), "itemTotal"))
    );
  }

  static fromJSON(text) { return OrderItemTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "OrderItemTyped");
    return raw.map((e) => OrderItemTyped.fromJsonValue(e));
  }

  toString() {
    return `Name=${this.name}, Quantity=${this.quantity}, Price=${this.price}, ItemTotal=${this.itemTotal}`;
  }

  equals(other) {
    if (!(other instanceof OrderItemTyped)) return false;
    return this.name === other.name
      && this.quantity === other.quantity
      && this.price === other.price
      && this.itemTotal === other.itemTotal;
  }
}
