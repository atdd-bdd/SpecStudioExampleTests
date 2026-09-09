import * as tokens from "./tokens.js";

export class DiscountInputString {
  static DNC_STRING = "?DNC?";

  constructor(totalPrice = "", discount = "", notes = "") {
    this.totalPrice = totalPrice;
    this.discount = discount;
    this.notes = notes;
  }

  static fromList(values) {
    const v = Array.from(values);
    return new DiscountInputString(
      v[0] ?? "",
      v[1] ?? "",
      v[2] ?? ""
    );
  }

  /** Builds from the text form, e.g. Money as "25 USD". */
  static fromText(text) {
    const parts = tokens.require_(text, 3, "DiscountInput");
    return new DiscountInputString(
      parts[0],
      parts[1],
      parts[2]
    );
  }

  toString() {
    return tokens.token(this.totalPrice) + " " + tokens.token(this.discount) + " " + tokens.token(this.notes);
  }

  equals(other) {
    if (!(other instanceof DiscountInputString)) return false;
    return (this.totalPrice === DiscountInputString.DNC_STRING || other.totalPrice === DiscountInputString.DNC_STRING || this.totalPrice === other.totalPrice)
      && (this.discount === DiscountInputString.DNC_STRING || other.discount === DiscountInputString.DNC_STRING || this.discount === other.discount)
      && (this.notes === DiscountInputString.DNC_STRING || other.notes === DiscountInputString.DNC_STRING || this.notes === other.notes);
  }

  static equalLists(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => row.equals(b[i]));
  }
}
