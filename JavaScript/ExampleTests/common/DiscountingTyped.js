import { DiscountingString } from "./DiscountingString.js";
import * as _json from "./json.js";

export class DiscountingTyped {
  constructor(totalPrice = "", discount = "", notes = "") {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromStringObj(s) {
    return new DiscountingTyped(
      new Dollar(s.totalPrice),
      new Percentage(s.discount),
      s.notes
    );
  }

  toJsonValue() {
    return {
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
      discount: this.discount == null ? null : String(this.discount),
      notes: this.notes,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new DiscountingTyped(
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice")),
      new Percentage(_json.asString(_json.require(m, "discount"), "discount")),
      _json.asString(_json.require(m, "notes"), "notes")
    );
  }

  static fromJSON(text) { return DiscountingTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "DiscountingTyped");
    return raw.map((e) => DiscountingTyped.fromJsonValue(e));
  }
}
