import { DiscountInputString } from "./DiscountInputString.js";
import * as _json from "./json.js";

export class DiscountInputTyped {
  constructor(totalPrice = "", discount = "", notes = "") {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromStringObj(s) {
    return new DiscountInputTyped(
      s.totalPrice,
      s.discount,
      s.notes
    );
  }

  toStringObj() {
    return new DiscountInputString(
      String(this.totalPrice),
      String(this.discount),
      String(this.notes)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => DiscountInputTyped.fromStringObj(s));
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
    return new DiscountInputTyped(
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice")),
      new Percentage(_json.asString(_json.require(m, "discount"), "discount")),
      _json.asString(_json.require(m, "notes"), "notes")
    );
  }

  static fromJSON(text) { return DiscountInputTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "DiscountInputTyped");
    return raw.map((e) => DiscountInputTyped.fromJsonValue(e));
  }

  toString() {
    return `Total Price=${this.totalPrice}, Discount=${this.discount}, Notes=${this.notes}`;
  }

  equals(other) {
    if (!(other instanceof DiscountInputTyped)) return false;
    return this.totalPrice === other.totalPrice
      && this.discount === other.discount
      && this.notes === other.notes;
  }
}
