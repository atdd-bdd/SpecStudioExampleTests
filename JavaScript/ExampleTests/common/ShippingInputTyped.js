import { ShippingInputString } from "./ShippingInputString.js";
import * as _json from "./json.js";

export class ShippingInputTyped {
  constructor(totalPrice = "", shippingCost = "", notes = "") {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromStringObj(s) {
    return new ShippingInputTyped(
      s.totalPrice,
      s.shippingCost,
      s.notes
    );
  }

  toJsonValue() {
    return {
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
      shippingCost: this.shippingCost == null ? null : String(this.shippingCost),
      notes: this.notes,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ShippingInputTyped(
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice")),
      new Dollar(_json.asString(_json.require(m, "shippingCost"), "shippingCost")),
      _json.asString(_json.require(m, "notes"), "notes")
    );
  }

  static fromJSON(text) { return ShippingInputTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ShippingInputTyped");
    return raw.map((e) => ShippingInputTyped.fromJsonValue(e));
  }

  toString() {
    return `Total Price=${this.totalPrice}, Shipping Cost=${this.shippingCost}, Notes=${this.notes}`;
  }

  equals(other) {
    if (!(other instanceof ShippingInputTyped)) return false;
    return this.totalPrice === other.totalPrice
      && this.shippingCost === other.shippingCost
      && this.notes === other.notes;
  }
}
