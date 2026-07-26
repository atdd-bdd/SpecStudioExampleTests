import { ShippingString } from "./ShippingString.js";
import * as _json from "./json.js";

export class ShippingTyped {
  totalPrice: string;
  shippingCost: string;
  notes: string;

  constructor(totalPrice: string, shippingCost: string, notes: string) {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromStringObj(s: ShippingString): ShippingTyped {
    return new ShippingTyped(
      s.totalPrice,
      s.shippingCost,
      s.notes
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalPrice: this.totalPrice,
      shippingCost: this.shippingCost,
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ShippingTyped {
    return new ShippingTyped(
      _json.asString(_json.requireField(m, "totalPrice"), "totalPrice"),
      _json.asString(_json.requireField(m, "shippingCost"), "shippingCost"),
      _json.asString(_json.requireField(m, "notes"), "notes")
    );
  }

  static fromJSON(text: string): ShippingTyped {
    return ShippingTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ShippingTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ShippingTyped[] {
    const raw = _json.asArray(_json.parse(text), "ShippingTyped") ?? [];
    return raw.map((e) => ShippingTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Shipping Cost=${this.shippingCost}, Notes=${this.notes}`;
  }

  equals(other: ShippingTyped): boolean {
    return this.totalPrice === other.totalPrice
      && this.shippingCost === other.shippingCost
      && this.notes === other.notes;
  }
}
