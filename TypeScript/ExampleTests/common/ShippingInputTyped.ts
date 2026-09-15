import { ShippingInputString } from "./ShippingInputString.js";
import * as _json from "./json.js";

export class ShippingInputTyped {
  totalPrice: string;
  shippingCost: string;
  notes: string;

  constructor(totalPrice: string, shippingCost: string, notes: string) {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromStringObj(s: ShippingInputString): ShippingInputTyped {
    return new ShippingInputTyped(
      s.totalPrice,
      s.shippingCost,
      s.notes
    );
  }

  toStringObj(): ShippingInputString {
    return new ShippingInputString(
      String(this.totalPrice),
      String(this.shippingCost),
      String(this.notes)
    );
  }

  static toStringList(list: ShippingInputTyped[]): ShippingInputString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ShippingInputString[]): ShippingInputTyped[] {
    return list.map(s => ShippingInputTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalPrice: this.totalPrice,
      shippingCost: this.shippingCost,
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ShippingInputTyped {
    return new ShippingInputTyped(
      _json.asString(_json.requireField(m, "totalPrice"), "totalPrice"),
      _json.asString(_json.requireField(m, "shippingCost"), "shippingCost"),
      _json.asString(_json.requireField(m, "notes"), "notes")
    );
  }

  static fromJSON(text: string): ShippingInputTyped {
    return ShippingInputTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ShippingInputTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ShippingInputTyped[] {
    const raw = _json.asArray(_json.parse(text), "ShippingInputTyped") ?? [];
    return raw.map((e) => ShippingInputTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Shipping Cost=${this.shippingCost}, Notes=${this.notes}`;
  }

  equals(other: ShippingInputTyped): boolean {
    return this.totalPrice === other.totalPrice
      && this.shippingCost === other.shippingCost
      && this.notes === other.notes;
  }
}
