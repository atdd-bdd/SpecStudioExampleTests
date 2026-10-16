import { CatalogItemString } from "./CatalogItemString.js";
import * as _json from "./json.js";
import { SimpleTextTyped } from "./SimpleTextTyped.js";
import { DollarTyped } from "./DollarTyped.js";

export class CatalogItemTyped {
  name: SimpleTextTyped;
  price: DollarTyped;

  constructor(name: SimpleTextTyped, price: DollarTyped) {
    this.name = name;
    this.price = price;
  }

  static fromStringObj(s: CatalogItemString): CatalogItemTyped {
    return new CatalogItemTyped(
      new SimpleTextTyped(s.name),
      new DollarTyped(s.price)
    );
  }

  toStringObj(): CatalogItemString {
    return new CatalogItemString(
      String(this.name),
      String(this.price)
    );
  }

  static toStringList(list: CatalogItemTyped[]): CatalogItemString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: CatalogItemString[]): CatalogItemTyped[] {
    return list.map(s => CatalogItemTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      name: String(this.name),
      price: String(this.price),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): CatalogItemTyped {
    return new CatalogItemTyped(
      new SimpleTextTyped(_json.asString(_json.requireField(m, "name"), "name")),
      new DollarTyped(_json.asString(_json.requireField(m, "price"), "price"))
    );
  }

  static fromJSON(text: string): CatalogItemTyped {
    return CatalogItemTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly CatalogItemTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): CatalogItemTyped[] {
    const raw = _json.asArray(_json.parse(text), "CatalogItemTyped") ?? [];
    return raw.map((e) => CatalogItemTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Name=${this.name}, Price=${this.price}`;
  }

  equals(other: CatalogItemTyped): boolean {
    return this.name.equals(other.name)
      && this.price.equals(other.price);
  }
}
