import { ShoppingCartString } from "./ShoppingCartString.js";
import * as _json from "./json.js";

export class ShoppingCartTyped {
  items: OrderItemCollection;
  shipping: Dollar;
  discount: Dollar;
  totalPrice: Dollar;
  shippingAddress: Address;
  billingAddress: Address;

  constructor(items: OrderItemCollection, shipping: Dollar, discount: Dollar, totalPrice: Dollar, shippingAddress: Address, billingAddress: Address) {
    this.items = items;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  static fromStringObj(s: ShoppingCartString): ShoppingCartTyped {
    return new ShoppingCartTyped(
      new OrderItemCollection(s.items),
      new Dollar(s.shipping),
      new Dollar(s.discount),
      new Dollar(s.totalPrice),
      new Address(s.shippingAddress),
      new Address(s.billingAddress)
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      items: this.items == null ? null : String(this.items),
      shipping: this.shipping == null ? null : String(this.shipping),
      discount: this.discount == null ? null : String(this.discount),
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
      shippingAddress: this.shippingAddress == null ? null : String(this.shippingAddress),
      billingAddress: this.billingAddress == null ? null : String(this.billingAddress),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ShoppingCartTyped {
    return new ShoppingCartTyped(
      new OrderItemCollection(_json.asString(_json.requireField(m, "items"), "items")),
      new Dollar(_json.asString(_json.requireField(m, "shipping"), "shipping")),
      new Dollar(_json.asString(_json.requireField(m, "discount"), "discount")),
      new Dollar(_json.asString(_json.requireField(m, "totalPrice"), "totalPrice")),
      new Address(_json.asString(_json.requireField(m, "shippingAddress"), "shippingAddress")),
      new Address(_json.asString(_json.requireField(m, "billingAddress"), "billingAddress"))
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
}
