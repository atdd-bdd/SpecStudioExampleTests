import * as tokens from "./tokens.js";

export class CatalogItemString {
  static DNC_STRING = "?DNC?";

  constructor(name = "", price = "") {
    this.name = name;
    this.price = price;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new CatalogItemString(
      v[0] ?? "",
      v[1] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 2, "CatalogItem");
    return new CatalogItemString(
      parts[0],
      parts[1]
    );
  }

  toString() {
    return tokens.token(this.name) + " " + tokens.token(this.price);
  }

  equals(other) {
    if (!(other instanceof CatalogItemString)) return false;
    return (this.name === CatalogItemString.DNC_STRING || other.name === CatalogItemString.DNC_STRING || this.name === other.name)
      && (this.price === CatalogItemString.DNC_STRING || other.price === CatalogItemString.DNC_STRING || this.price === other.price);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
