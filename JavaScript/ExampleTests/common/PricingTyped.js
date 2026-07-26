import { PricingString } from "./PricingString.js";
import * as _json from "./json.js";

export class PricingTyped {
  constructor(totalPrice = "") {
    this.totalPrice = totalPrice;
  }

  static fromStringObj(s) {
    return new PricingTyped(
      s.totalPrice
    );
  }

  toJsonValue() {
    return {
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new PricingTyped(
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice"))
    );
  }

  static fromJSON(text) { return PricingTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "PricingTyped");
    return raw.map((e) => PricingTyped.fromJsonValue(e));
  }

  toString() {
    return `TotalPrice=${this.totalPrice}`;
  }

  equals(other) {
    if (!(other instanceof PricingTyped)) return false;
    return this.totalPrice === other.totalPrice;
  }
}
