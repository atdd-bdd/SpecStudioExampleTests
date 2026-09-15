import { CartInputString } from "./CartInputString.js";
import * as _json from "./json.js";

export class CartInputTyped {
  constructor(totalItems = "", shipping = "", discount = "", totalPrice = "", notes = "") {
    this.totalItems = totalItems;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.notes = notes;
  }

  static fromStringObj(s) {
    return new CartInputTyped(
      s.totalItems,
      s.shipping,
      s.discount,
      s.totalPrice,
      s.notes
    );
  }

  toStringObj() {
    return new CartInputString(
      String(this.totalItems),
      String(this.shipping),
      String(this.discount),
      String(this.totalPrice),
      String(this.notes)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => CartInputTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      totalItems: this.totalItems == null ? null : String(this.totalItems),
      shipping: this.shipping == null ? null : String(this.shipping),
      discount: this.discount == null ? null : String(this.discount),
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
      notes: this.notes,
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new CartInputTyped(
      new Dollar(_json.asString(_json.require(m, "totalItems"), "totalItems")),
      new Dollar(_json.asString(_json.require(m, "shipping"), "shipping")),
      new Dollar(_json.asString(_json.require(m, "discount"), "discount")),
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice")),
      _json.asString(_json.require(m, "notes"), "notes")
    );
  }

  static fromJSON(text) { return CartInputTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "CartInputTyped");
    return raw.map((e) => CartInputTyped.fromJsonValue(e));
  }

  toString() {
    return `TotalItems=${this.totalItems}, Shipping=${this.shipping}, Discount=${this.discount}, Total Price=${this.totalPrice}, Notes=${this.notes}`;
  }

  equals(other) {
    if (!(other instanceof CartInputTyped)) return false;
    return this.totalItems === other.totalItems
      && this.shipping === other.shipping
      && this.discount === other.discount
      && this.totalPrice === other.totalPrice
      && this.notes === other.notes;
  }
}
