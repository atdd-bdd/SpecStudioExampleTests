import { ItemPriceInputString } from "./ItemPriceInputString.js";
import * as _json from "./json.js";

export class ItemPriceInputTyped {
  constructor(totalItems = "") {
    this.totalItems = totalItems;
  }

  static fromStringObj(s) {
    return new ItemPriceInputTyped(
      s.totalItems
    );
  }

  toStringObj() {
    return new ItemPriceInputString(
      String(this.totalItems)
    );
  }

  static toStringList(list) {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list) {
    return list.map(s => ItemPriceInputTyped.fromStringObj(s));
  }

  toJsonValue() {
    return {
      totalItems: this.totalItems == null ? null : String(this.totalItems),
    };
  }

  toJSON() { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m) {
    return new ItemPriceInputTyped(
      new Dollar(_json.asString(_json.require(m, "totalItems"), "totalItems"))
    );
  }

  static fromJSON(text) { return ItemPriceInputTyped.fromJsonValue(_json.parse(text)); }

  static toJSONList(items) {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text) {
    const raw = _json.asArray(_json.parse(text), "ItemPriceInputTyped");
    return raw.map((e) => ItemPriceInputTyped.fromJsonValue(e));
  }

  toString() {
    return `TotalItems=${this.totalItems}`;
  }

  equals(other) {
    if (!(other instanceof ItemPriceInputTyped)) return false;
    return this.totalItems === other.totalItems;
  }
}
