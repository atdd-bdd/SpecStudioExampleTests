import { ShippingString } from "./ShippingString.js";
import * as _json from "./json.js";

export class ShippingTyped {
  constructor(totalPrice = "", shippingCost = "", notes = "") {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromStringObj(s) {
    return new ShippingTyped(
      new Dollar(s.totalPrice),
      new Dollar(s.shippingCost),
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
    return new ShippingTyped(
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice")),
      new Dollar(_json.asString(_json.require(m, "shippingCost"), "shippingCost")),
      _json.asString(_json.require(m, "notes"), "notes")
    );
  }

  static fromJSON(text) { return ShippingTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ShippingTyped");
    return raw.map((e) => ShippingTyped.fromJsonValue(e));
  }
}
