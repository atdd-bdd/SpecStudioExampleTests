import { ShoppingCartString } from "./ShoppingCartString.js";
import * as _json from "./json.js";

export class ShoppingCartTyped {
  constructor(items = "", shipping = "", discount = "", totalPrice = "", shippingAddress = "", billingAddress = "") {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromStringObj(s) {
    return new ShoppingCartTyped(
      new OrderItemCollection(s.items),
      new Dollar(s.shipping),
      new Dollar(s.discount),
      new Dollar(s.totalPrice),
      new Address(s.shippingAddress),
      new Address(s.billingAddress)
    );
  }

  toJsonValue() {
    return {
      items: this.items == null ? null : String(this.items),
      shipping: this.shipping == null ? null : String(this.shipping),
      discount: this.discount == null ? null : String(this.discount),
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
      shippingAddress: this.shippingAddress == null ? null : String(this.shippingAddress),
      billingAddress: this.billingAddress == null ? null : String(this.billingAddress),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ShoppingCartTyped(
      new OrderItemCollection(_json.asString(_json.require(m, "items"), "items")),
      new Dollar(_json.asString(_json.require(m, "shipping"), "shipping")),
      new Dollar(_json.asString(_json.require(m, "discount"), "discount")),
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice")),
      new Address(_json.asString(_json.require(m, "shippingAddress"), "shippingAddress")),
      new Address(_json.asString(_json.require(m, "billingAddress"), "billingAddress"))
    );
  }

  static fromJSON(text) { return ShoppingCartTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ShoppingCartTyped");
    return raw.map((e) => ShoppingCartTyped.fromJsonValue(e));
  }
}
