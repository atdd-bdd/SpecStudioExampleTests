import { ShoppingCartString } from "./ShoppingCartString.js";
import * as _json from "./json.js";
import { OrderItemTyped } from "./OrderItemTyped.js";
import { AddressTyped } from "./AddressTyped.js";

export class ShoppingCartTyped {
  items: OrderItemTyped[];
  shipping: string;
  discount: string;
  totalPrice: string;
  shippingAddress: AddressTyped;
  billingAddress: AddressTyped;

  constructor(items: OrderItemTyped[], shipping: string, discount: string, totalPrice: string, shippingAddress: AddressTyped, billingAddress: AddressTyped) {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromStringObj(s: ShoppingCartString): ShoppingCartTyped {
    return new ShoppingCartTyped(
      [],
      s.shipping,
      s.discount,
      s.totalPrice,
      AddressTyped.fromStringObj(s.shippingAddress),
      AddressTyped.fromStringObj(s.billingAddress)
    );
  }

  toStringObj(): ShoppingCartString {
    return new ShoppingCartString(
      "",
      String(this.shipping),
      String(this.discount),
      String(this.totalPrice),
      this.shippingAddress.toStringObj(),
      this.billingAddress.toStringObj()
    );
  }

  static toStringList(list: ShoppingCartTyped[]): ShoppingCartString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ShoppingCartString[]): ShoppingCartTyped[] {
    return list.map(s => ShoppingCartTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      items: this.items.map((e) => e.toJsonValue()),
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
      (_json.asArray(_json.requireField(m, "items"), "items") ?? []).map((e) => OrderItemTyped.fromJsonValue(e)),
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
