import { DiscountingString } from "./DiscountingString.js";
import * as _json from "./json.js";

export class DiscountingTyped {
  totalPrice: string;
  discount: string;
  notes: string;

  constructor(totalPrice: string, discount: string, notes: string) {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromStringObj(s: DiscountingString): DiscountingTyped {
    return new DiscountingTyped(
      s.totalPrice,
      s.discount,
      s.notes
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalPrice: this.totalPrice,
      discount: this.discount,
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): DiscountingTyped {
    return new DiscountingTyped(
      _json.asString(_json.requireField(m, "totalPrice"), "totalPrice"),
      _json.asString(_json.requireField(m, "discount"), "discount"),
      _json.asString(_json.requireField(m, "notes"), "notes")
    );
  }

  static fromJSON(text: string): DiscountingTyped {
    return DiscountingTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly DiscountingTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): DiscountingTyped[] {
    const raw = _json.asArray(_json.parse(text), "DiscountingTyped") ?? [];
    return raw.map((e) => DiscountingTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Discount=${this.discount}, Notes=${this.notes}`;
  }

  equals(other: DiscountingTyped): boolean {
    return this.totalPrice === other.totalPrice
      && this.discount === other.discount
      && this.notes === other.notes;
  }
}
