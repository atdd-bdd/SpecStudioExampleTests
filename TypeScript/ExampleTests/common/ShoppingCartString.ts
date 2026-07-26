import { AddressString } from "./AddressString.js";

export class ShoppingCartString {
  static readonly DNC_STRING = "?DNC?";

  items: string;
  shipping: string;
  discount: string;
  totalPrice: string;
  shippingAddress: AddressString;
  billingAddress: AddressString;

  constructor(items: string = "", shipping: string = "", discount: string = "", totalPrice: string = "", shippingAddress: AddressString = new AddressString(), billingAddress: AddressString = new AddressString()) {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromList(values: Iterable<string>): ShoppingCartString {
    const v = Array.from(values);
    const r = new ShoppingCartString();
    r.items = v[0] ?? "";
    r.shipping = v[1] ?? "";
    r.discount = v[2] ?? "";
    r.totalPrice = v[3] ?? "";
    return r;
  }

  toString(): string {
    return `Items=${this.items}, Shipping=${this.shipping}, Discount=${this.discount}, TotalPrice=${this.totalPrice}, ShippingAddress=${this.shippingAddress}, BillingAddress=${this.billingAddress}`;
  }

  equals(other: ShoppingCartString): boolean {
    return (this.items === ShoppingCartString.DNC_STRING || other.items === ShoppingCartString.DNC_STRING || this.items === other.items)
      && (this.shipping === ShoppingCartString.DNC_STRING || other.shipping === ShoppingCartString.DNC_STRING || this.shipping === other.shipping)
      && (this.discount === ShoppingCartString.DNC_STRING || other.discount === ShoppingCartString.DNC_STRING || this.discount === other.discount)
      && (this.totalPrice === ShoppingCartString.DNC_STRING || other.totalPrice === ShoppingCartString.DNC_STRING || this.totalPrice === other.totalPrice)
      && this.shippingAddress.equals(other.shippingAddress)
      && this.billingAddress.equals(other.billingAddress);
  }

  static equalLists(a: ShoppingCartString[], b: ShoppingCartString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
