import { PricingString } from "./PricingString.js";
import * as _json from "./json.js";

export class PricingTyped {
  totalPrice: string;

  constructor(totalPrice: string) {
    this.totalPrice = totalPrice;
  }

  static fromStringObj(s: PricingString): PricingTyped {
    return new PricingTyped(
      s.totalPrice
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalPrice: this.totalPrice,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): PricingTyped {
    return new PricingTyped(
      _json.asString(_json.requireField(m, "totalPrice"), "totalPrice")
    );
  }

  static fromJSON(text: string): PricingTyped {
    return PricingTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly PricingTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): PricingTyped[] {
    const raw = _json.asArray(_json.parse(text), "PricingTyped") ?? [];
    return raw.map((e) => PricingTyped.fromJsonValue(e));
  }

  toString(): string {
    return `TotalPrice=${this.totalPrice}`;
  }

  equals(other: PricingTyped): boolean {
    return this.totalPrice === other.totalPrice;
  }
}
