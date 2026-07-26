import { CatalogItemString } from "./CatalogItemString.js";
import * as _json from "./json.js";

export class CatalogItemTyped {
  name: SimpleText;
  price: Dollar;

  constructor(name: SimpleText, price: Dollar) {
    this.name = name;
    this.price = price;
  }

  static fromStringObj(s: CatalogItemString): CatalogItemTyped {
    return new CatalogItemTyped(
      new SimpleText(s.name),
      new Dollar(s.price)
    );
  }

  toJsonValue(): Record<string, unknown> {
    return {
      name: this.name == null ? null : String(this.name),
      price: this.price == null ? null : String(this.price),
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): CatalogItemTyped {
    return new CatalogItemTyped(
      new SimpleText(_json.asString(_json.requireField(m, "name"), "name")),
      new Dollar(_json.asString(_json.requireField(m, "price"), "price"))
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
}
