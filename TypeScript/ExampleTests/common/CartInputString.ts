
import * as tokens from "./tokens.js";

export class CartInputString {
  static readonly DNC_STRING = "?DNC?";

  totalItems: string;
  shipping: string;
  discount: string;
  totalPrice: string;
  notes: string;

  constructor(totalItems: string = "", shipping: string = "", discount: string = "", totalPrice: string = "", notes: string = "") {
    this.totalItems = totalItems;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.notes = notes;
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text: string): CartInputString {
    const parts = tokens.require_(text, 5, "CartInput");
    return new CartInputString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4]
    );
  }

  static fromList(values: Iterable<string>): CartInputString {
    const v = Array.from(values);
    const r = new CartInputString();
    r.totalItems = v[0] ?? "";
    r.shipping = v[1] ?? "";
    r.discount = v[2] ?? "";
    r.totalPrice = v[3] ?? "";
    r.notes = v[4] ?? "";
    return r;
  }

  toString(): string {
    return tokens.token(this.totalItems) + " " + tokens.token(this.shipping) + " " + tokens.token(this.discount) + " " + tokens.token(this.totalPrice) + " " + tokens.token(this.notes);
  }

  equals(other: CartInputString): boolean {
    return (this.totalItems === CartInputString.DNC_STRING || other.totalItems === CartInputString.DNC_STRING || this.totalItems === other.totalItems)
      && (this.shipping === CartInputString.DNC_STRING || other.shipping === CartInputString.DNC_STRING || this.shipping === other.shipping)
      && (this.discount === CartInputString.DNC_STRING || other.discount === CartInputString.DNC_STRING || this.discount === other.discount)
      && (this.totalPrice === CartInputString.DNC_STRING || other.totalPrice === CartInputString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.notes === CartInputString.DNC_STRING || other.notes === CartInputString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a: CartInputString[], b: CartInputString[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]!));
  }
}
