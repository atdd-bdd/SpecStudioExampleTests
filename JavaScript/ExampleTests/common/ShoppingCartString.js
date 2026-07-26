import { AddressString } from "./AddressString.js";

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

  toString() {
    return `Items=${this.items}, Shipping=${this.shipping}, Discount=${this.discount}, TotalPrice=${this.totalPrice}, ShippingAddress=${this.shippingAddress}, BillingAddress=${this.billingAddress}`;
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
