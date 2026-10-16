import { DiscountInputString } from "./DiscountInputString.js";
import * as _json from "./json.js";
import { DollarTyped } from "./DollarTyped.js";
import { PercentageTyped } from "./PercentageTyped.js";

export class DiscountInputTyped {
  totalPrice: DollarTyped;
  discount: PercentageTyped;
  notes: string;

  constructor(totalPrice: DollarTyped, discount: PercentageTyped, notes: string) {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromStringObj(s: DiscountInputString): DiscountInputTyped {
    return new DiscountInputTyped(
      new DollarTyped(s.totalPrice),
      new PercentageTyped(s.discount),
      s.notes
    );
  }

  toStringObj(): DiscountInputString {
    return new DiscountInputString(
      String(this.totalPrice),
      String(this.discount),
      String(this.notes)
    );
  }

  static toStringList(list: DiscountInputTyped[]): DiscountInputString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: DiscountInputString[]): DiscountInputTyped[] {
    return list.map(s => DiscountInputTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalPrice: String(this.totalPrice),
      discount: String(this.discount),
      notes: this.notes,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): DiscountInputTyped {
    return new DiscountInputTyped(
      new DollarTyped(_json.asString(_json.requireField(m, "totalPrice"), "totalPrice")),
      new PercentageTyped(_json.asString(_json.requireField(m, "discount"), "discount")),
      _json.asString(_json.requireField(m, "notes"), "notes")
    );
  }

  static fromJSON(text: string): DiscountInputTyped {
    return DiscountInputTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly DiscountInputTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): DiscountInputTyped[] {
    const raw = _json.asArray(_json.parse(text), "DiscountInputTyped") ?? [];
    return raw.map((e) => DiscountInputTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Total Price=${this.totalPrice}, Discount=${this.discount}, Notes=${this.notes}`;
  }

  equals(other: DiscountInputTyped): boolean {
    return this.totalPrice.equals(other.totalPrice)
      && this.discount.equals(other.discount)
      && this.notes === other.notes;
  }
}
