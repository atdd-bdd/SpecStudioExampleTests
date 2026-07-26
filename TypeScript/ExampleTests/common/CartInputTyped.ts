import { CartInputString } from "./CartInputString.js";
import * as _json from "./json.js";

export class CartInputTyped {
  totalItems: string;
  shipping: string;
  discount: string;
  totalPrice: string;
  notes: string;

  constructor(totalItems: string, shipping: string, discount: string, totalPrice: string, notes: string) {
    this.totalItems = totalItems;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.notes = notes;
  }

  static fromStringObj(s: CartInputString): CartInputTyped {
    return new CartInputTyped(
      s.totalItems,
      s.shipping,
      s.discount,
      s.totalPrice,
      s.notes
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalItems: this.totalItems,
      shipping: this.shipping,
      discount: this.discount,
      totalPrice: this.totalPrice,
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): CartInputTyped {
    return new CartInputTyped(
      _json.asString(_json.requireField(m, "totalItems"), "totalItems"),
      _json.asString(_json.requireField(m, "shipping"), "shipping"),
      _json.asString(_json.requireField(m, "discount"), "discount"),
      _json.asString(_json.requireField(m, "totalPrice"), "totalPrice"),
      _json.asString(_json.requireField(m, "notes"), "notes")
    );
  }

  static fromJSON(text: string): CartInputTyped {
    return CartInputTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly CartInputTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): CartInputTyped[] {
    const raw = _json.asArray(_json.parse(text), "CartInputTyped") ?? [];
    return raw.map((e) => CartInputTyped.fromJsonValue(e));
  }

  toString(): string {
    return `TotalItems=${this.totalItems}, Shipping=${this.shipping}, Discount=${this.discount}, Total Price=${this.totalPrice}, Notes=${this.notes}`;
  }

  equals(other: CartInputTyped): boolean {
    return this.totalItems === other.totalItems
      && this.shipping === other.shipping
      && this.discount === other.discount
      && this.totalPrice === other.totalPrice
      && this.notes === other.notes;
  }
}
