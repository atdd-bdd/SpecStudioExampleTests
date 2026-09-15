import { ShoppingCartString } from "./ShoppingCartString.js";
import * as _json from "./json.js";
import { OrderItemTyped } from "./OrderItemTyped.js";
import { AddressTyped } from "./AddressTyped.js";

export class ShoppingCartTyped {
  constructor(items = [], shipping = "", discount = "", totalPrice = "", shippingAddress = "", billingAddress = "") {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromStringObj(s) {
    return new ShoppingCartTyped(
      [],
      s.shipping,
      s.discount,
      s.totalPrice,
      AddressTyped.fromStringObj(s.shippingAddress),
      AddressTyped.fromStringObj(s.billingAddress)
    );
  }

  toStringObj() {
    return new ShoppingCartString(
      "",
      String(this.shipping),
      String(this.discount),
      String(this.totalPrice),
      this.shippingAddress.toStringObj(),
      this.billingAddress.toStringObj()
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ShoppingCartTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      items: this.items.map((e) => e.toJsonValue()),
      shipping: this.shipping == null ? null : String(this.shipping),
      discount: this.discount == null ? null : String(this.discount),
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
      shippingAddress: this.shippingAddress.toJsonValue(),
      billingAddress: this.billingAddress.toJsonValue(),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ShoppingCartTyped(
      (_json.asArray(_json.require(m, "items"), "items") ?? []).map((e) => OrderItemTyped.fromJsonValue(e)),
      new Dollar(_json.asString(_json.require(m, "shipping"), "shipping")),
      new Dollar(_json.asString(_json.require(m, "discount"), "discount")),
      new Dollar(_json.asString(_json.require(m, "totalPrice"), "totalPrice")),
      AddressTyped.fromJsonValue(_json.require(m, "shippingAddress")),
      AddressTyped.fromJsonValue(_json.require(m, "billingAddress"))
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

  toString() {
    return `Items=${this.items}, Shipping=${this.shipping}, Discount=${this.discount}, TotalPrice=${this.totalPrice}, ShippingAddress=${this.shippingAddress}, BillingAddress=${this.billingAddress}`;
  }

  equals(other) {
    if (!(other instanceof ShoppingCartTyped)) return false;
    return this.items === other.items
      && this.shipping === other.shipping
      && this.discount === other.discount
      && this.totalPrice === other.totalPrice
      && this.shippingAddress.equals(other.shippingAddress)
      && this.billingAddress.equals(other.billingAddress);
  }
}
