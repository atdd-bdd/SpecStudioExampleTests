import * as tokens from "./tokens.js";

export class CartInputString {
  static DNC_STRING = "?DNC?";

  constructor(totalItems = "", shipping = "", discount = "", totalPrice = "", notes = "") {
    this.totalItems = totalItems;
    this.shipping = shipping;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.notes = notes;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new CartInputString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? "",
      v[3] ?? "",
      v[4] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 5, "CartInput");
    return new CartInputString(
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      parts[4]
    );
  }

  toString() {
    return tokens.token(this.totalItems) + " " + tokens.token(this.shipping) + " " + tokens.token(this.discount) + " " + tokens.token(this.totalPrice) + " " + tokens.token(this.notes);
  }

  equals(other) {
    if (!(other instanceof CartInputString)) return false;
    return (this.totalItems === CartInputString.DNC_STRING || other.totalItems === CartInputString.DNC_STRING || this.totalItems === other.totalItems)
      && (this.shipping === CartInputString.DNC_STRING || other.shipping === CartInputString.DNC_STRING || this.shipping === other.shipping)
      && (this.discount === CartInputString.DNC_STRING || other.discount === CartInputString.DNC_STRING || this.discount === other.discount)
      && (this.totalPrice === CartInputString.DNC_STRING || other.totalPrice === CartInputString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.notes === CartInputString.DNC_STRING || other.notes === CartInputString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
