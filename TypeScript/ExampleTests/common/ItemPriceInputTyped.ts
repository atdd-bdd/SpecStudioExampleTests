import { ItemPriceInputString } from "./ItemPriceInputString.js";
import * as _json from "./json.js";

export class ItemPriceInputTyped {
  totalItems: string;

  constructor(totalItems: string) {
    this.totalItems = totalItems;
  }

  static fromStringObj(s: ItemPriceInputString): ItemPriceInputTyped {
    return new ItemPriceInputTyped(
      s.totalItems
    );
  }

  toStringObj(): ItemPriceInputString {
    return new ItemPriceInputString(
      String(this.totalItems)
    );
  }

  static toStringList(list: ItemPriceInputTyped[]): ItemPriceInputString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ItemPriceInputString[]): ItemPriceInputTyped[] {
    return list.map(s => ItemPriceInputTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      totalItems: this.totalItems,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ItemPriceInputTyped {
    return new ItemPriceInputTyped(
      _json.asString(_json.requireField(m, "totalItems"), "totalItems")
    );
  }

  static fromJSON(text: string): ItemPriceInputTyped {
    return ItemPriceInputTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ItemPriceInputTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ItemPriceInputTyped[] {
    const raw = _json.asArray(_json.parse(text), "ItemPriceInputTyped") ?? [];
    return raw.map((e) => ItemPriceInputTyped.fromJsonValue(e));
  }

  toString(): string {
    return `TotalItems=${this.totalItems}`;
  }

  equals(other: ItemPriceInputTyped): boolean {
    return this.totalItems === other.totalItems;
  }
}
