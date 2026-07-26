import { ShippingString } from "./ShippingString.js";
import * as _json from "./json.js";

export class ShippingTyped {
  totalPrice: Dollar;
  shippingCost: Dollar;
  notes: string;

  constructor(totalPrice: Dollar, shippingCost: Dollar, notes: string) {
    this.totalPrice = totalPrice;
    this.shippingCost = shippingCost;
    this.notes = notes;
  }

  static fromStringObj(s: ShippingString): ShippingTyped {
    return new ShippingTyped(
      new Dollar(s.totalPrice),
      new Dollar(s.shippingCost),
      s.notes
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalPrice: this.totalPrice == null ? null : String(this.totalPrice),
      shippingCost: this.shippingCost == null ? null : String(this.shippingCost),
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ShippingTyped {
    return new ShippingTyped(
      new Dollar(_json.asString(_json.requireField(m, "totalPrice"), "totalPrice")),
      new Dollar(_json.asString(_json.requireField(m, "shippingCost"), "shippingCost")),
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
}
