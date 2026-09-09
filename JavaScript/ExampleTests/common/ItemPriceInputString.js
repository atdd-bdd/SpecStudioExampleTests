import * as tokens from "./tokens.js";

export class ItemPriceInputString {
  static DNC_STRING = "?DNC?";

  constructor(totalItems = "") {
    this.totalItems = totalItems;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new ItemPriceInputString(
      v[0] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 1, "ItemPriceInput");
    return new ItemPriceInputString(
      parts[0]
    );
  }

  toString() {
    return tokens.token(this.totalItems);
  }

  equals(other) {
    if (!(other instanceof ItemPriceInputString)) return false;
    return (this.totalItems === ItemPriceInputString.DNC_STRING || other.totalItems === ItemPriceInputString.DNC_STRING || this.totalItems === other.totalItems);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
