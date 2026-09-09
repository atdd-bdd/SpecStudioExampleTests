
import * as tokens from "./tokens.js";

export class ItemPriceInputString {
  static readonly DNC_STRING = "?DNC?";

  totalItems: string;

  constructor(totalItems: string = "") {
    this.totalItems = totalItems;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): ItemPriceInputString {
    const parts = tokens.require_(text, 1, "ItemPriceInput");
    return new ItemPriceInputString(
      parts[0]
    );
  }

  static fromList(values: Iterable<string>): ItemPriceInputString {
    const v = Array.from(values);
    const r = new ItemPriceInputString();
    r.totalItems = v[0] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.totalItems);
  }

  equals(other: ItemPriceInputString): boolean {
    return (this.totalItems === ItemPriceInputString.DNC_STRING || other.totalItems === ItemPriceInputString.DNC_STRING || this.totalItems === other.totalItems);
  }

  static equalLists(a: ItemPriceInputString[], b: ItemPriceInputString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
