import { CatalogItemString } from "./CatalogItemString.js";
import * as _json from "./json.js";

export class CatalogItemTyped {
  name: string;
  price: string;

  constructor(name: string, price: string) {
    this.name = name;
    this.price = price;
  }

  static fromStringObj(s: CatalogItemString): CatalogItemTyped {
    return new CatalogItemTyped(
      s.name,
      s.price
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
      name: this.name,
      price: this.price,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): CatalogItemTyped {
    return new CatalogItemTyped(
      _json.asString(_json.requireField(m, "name"), "name"),
      _json.asString(_json.requireField(m, "price"), "price")
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
    return this.name === other.name
      && this.price === other.price;
  }
}
