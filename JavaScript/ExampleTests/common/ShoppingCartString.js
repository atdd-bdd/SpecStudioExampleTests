import { AddressString } from "./AddressString.js";
import * as tokens from "./tokens.js";

export class ShoppingCartString {
  static DNC_STRING = "?DNC?";

  constructor(items = "", shipping = "", discount = "", totalPrice = "", shippingAddress = "", billingAddress = "") {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ShoppingCartString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? "",
      v[4] ?? "",
      v[5] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 6, "ShoppingCart");
    return new ShoppingCartString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      AddressString.fromText(parts[4]),
      AddressString.fromText(parts[5])
    );
  }

  toString() {
    return tokens.token(this.items) + " " + tokens.token(this.shipping) + " " + tokens.token(this.discount) + " " + tokens.token(this.totalPrice) + " " + tokens.nested(String(this.shippingAddress)) + " " + tokens.nested(String(this.billingAddress));
  }

  equals(other) {
    if (!(other instanceof ShoppingCartString)) return false;
    return (this.items === ShoppingCartString.DNC_STRING || other.items === ShoppingCartString.DNC_STRING || this.items === other.items)
      && (this.shipping === ShoppingCartString.DNC_STRING || other.shipping === ShoppingCartString.DNC_STRING || this.shipping === other.shipping)
      && (this.discount === ShoppingCartString.DNC_STRING || other.discount === ShoppingCartString.DNC_STRING || this.discount === other.discount)
      && (this.totalPrice === ShoppingCartString.DNC_STRING || other.totalPrice === ShoppingCartString.DNC_STRING || this.totalPrice === other.totalPrice)
      && this.shippingAddress.equals(other.shippingAddress)
      && this.billingAddress.equals(other.billingAddress);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
