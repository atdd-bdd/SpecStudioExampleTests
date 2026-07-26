import { CatalogItemString } from "./CatalogItemString.js";
import * as _json from "./json.js";

export class CatalogItemTyped {
  constructor(name = "", price = "") {
    this.name = name;
    this.price = price;
  }

  static fromStringObj(s) {
    return new CatalogItemTyped(
      s.name,
      s.price
    );
  }

  toJsonValue() {
    return {
      name: this.name == null ? null : String(this.name),
      price: this.price == null ? null : String(this.price),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new CatalogItemTyped(
      new SimpleText(_json.asString(_json.require(m, "name"), "name")),
      new Dollar(_json.asString(_json.require(m, "price"), "price"))
    );
  }

  static fromJSON(text) { return CatalogItemTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "CatalogItemTyped");
    return raw.map((e) => CatalogItemTyped.fromJsonValue(e));
  }

  toString() {
    return `Name=${this.name}, Price=${this.price}`;
  }

  equals(other) {
    if (!(other instanceof CatalogItemTyped)) return false;
    return this.name === other.name
      && this.price === other.price;
  }
}
