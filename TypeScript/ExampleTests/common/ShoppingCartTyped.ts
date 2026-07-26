import { ShoppingCartString } from "./ShoppingCartString.js";
import * as _json from "./json.js";
import { AddressTyped } from "./AddressTyped.js";

export class ShoppingCartTyped {
  items: string;
  shipping: string;
  discount: string;
  totalPrice: string;
  shippingAddress: AddressTyped;
  billingAddress: AddressTyped;

  constructor(items: string, shipping: string, discount: string, totalPrice: string, shippingAddress: AddressTyped, billingAddress: AddressTyped) {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromStringObj(s: ShoppingCartString): ShoppingCartTyped {
    return new ShoppingCartTyped(
      s.items,
      s.shipping,
      s.discount,
      s.totalPrice,
      AddressTyped.fromStringObj(s.shippingAddress),
      AddressTyped.fromStringObj(s.billingAddress)
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      items: this.items,
      shipping: this.shipping,
      discount: this.discount,
      totalPrice: this.totalPrice,
      shippingAddress: this.shippingAddress.toJsonValue(),
      billingAddress: this.billingAddress.toJsonValue(),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ShoppingCartTyped {
    return new ShoppingCartTyped(
      _json.asString(_json.requireField(m, "items"), "items"),
      _json.asString(_json.requireField(m, "shipping"), "shipping"),
      _json.asString(_json.requireField(m, "discount"), "discount"),
      _json.asString(_json.requireField(m, "totalPrice"), "totalPrice"),
      AddressTyped.fromJsonValue(_json.requireField(m, "shippingAddress")),
      AddressTyped.fromJsonValue(_json.requireField(m, "billingAddress"))
    );
  }

  static fromJSON(text: string): ShoppingCartTyped {
    return ShoppingCartTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ShoppingCartTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ShoppingCartTyped[] {
    const raw = _json.asArray(_json.parse(text), "ShoppingCartTyped") ?? [];
    return raw.map((e) => ShoppingCartTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Items=${this.items}, Shipping=${this.shipping}, Discount=${this.discount}, TotalPrice=${this.totalPrice}, ShippingAddress=${this.shippingAddress}, BillingAddress=${this.billingAddress}`;
  }

  equals(other: ShoppingCartTyped): boolean {
    return this.items === other.items
      && this.shipping === other.shipping
      && this.discount === other.discount
      && this.totalPrice === other.totalPrice
      && this.shippingAddress.equals(other.shippingAddress)
      && this.billingAddress.equals(other.billingAddress);
  }
}
